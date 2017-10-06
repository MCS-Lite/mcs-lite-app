import os from 'os';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { kill } from 'cross-port-killer';
import $rest from '../../configs/rest.json';
import $wot from '../../configs/wot.json';
import $stream from '../../configs/stream.json';

module.exports = $db => {
  let serviceStatus;
  const users = $db.users;

  const startService = (req, res) => {
    global.startMCSLiteService();
    serviceStatus = true;
    return res.send(200, 'success!');
  };

  const stopService = (req, res) => {
    kill($rest.port);
    kill($wot.port);
    kill($stream.serverPort);
    kill($stream.rtmpServerPort);
    serviceStatus = false;
    return res.send(200, 'success.');
  };

  const retrieveServiceSetting = (req, res) => {
    try {
      const configFilePath = path.resolve(
        __dirname,
        `../../configs/${req.params.settingId}.json`,
      );
      return fs.readFile(configFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        return res.send(200, { data: JSON.parse(data) });
      });
    } catch (e) {
      return res.send(400, 'Cannot find this file.');
    }
  };

  const editServiceSetting = (req, res) =>
    new Promise((resolve, reject) => {
      const content = req.body.content;
      return fs.writeFile(
        path.resolve(__dirname, `../../configs/${req.params.settingId}.json`),
        JSON.stringify(content, null, 4),
        err => {
          if (err) reject(err);
          resolve();
        },
      );
    })
      .then(() => res.send(200, 'success.'))
      .catch(err => res.send(400, err));

  const resetServiceSetting = (req, res) =>
    new Promise((resolve, reject) =>
      exec(
        'rm -rf ./configs/ && mkdir configs && cp -R ./defaultConfigs/* ./configs',
        { cwd: path.resolve(__dirname, '../../') },
        error => {
          if (error) reject(error);
          resolve();
        },
      ),
    )
      .then(() => res.send(200, 'success.'))
      .catch(err => res.send(400, err));

  const getServiceIp = (req, res) => {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    const restPath = path.resolve(__dirname, '../../configs/rest.json');

    return fs.readFile(restPath, 'utf8', (err, data) => {
      const dataJSON = JSON.parse(data);
      if (serviceStatus) {
        Object.keys(interfaces).forEach(k => {
          Object.keys(interfaces[k]).forEach(k2 => {
            const address = interfaces[k][k2];
            if (address.family === 'IPv4' && !address.internal) {
              addresses.push(`${address.address}:${dataJSON.port}`);
            }
          });
        });
      }
      return res.send(200, { data: addresses });
    });
  };

  const getServiceLog = (req, res) =>
    res.send(200, { data: JSON.stringify(global.logs) });

  const resetData = (req, res) => {
    users
      .retrieveAdminUsers()
      .then(data => {
        let adminUsersContent = '';

        data.forEach(k => {
          adminUsersContent += `${k.toString()}\n`;
        });

        fs.writeFileSync(
          path.resolve(__dirname, '../../db/users.json'),
          adminUsersContent,
          'utf8',
        );
        fs.writeFileSync(
          path.resolve(__dirname, '../../db/datapoints.json'),
          '',
          'utf8',
        );
        fs.writeFileSync(
          path.resolve(__dirname, '../../db/devices.json'),
          '',
          'utf8',
        );
        fs.writeFileSync(
          path.resolve(__dirname, '../../db/prototypes.json'),
          '',
          'utf8',
        );
        return res.send(200, 'success.');
      })
      .catch(err => res.send(400, err));
  };

  return {
    serviceStatus: false,
    retrieveServiceSetting,
    editServiceSetting,
    resetServiceSetting,
    getServiceIp,
    resetData,
    getServiceLog,
    startService,
    stopService,
  };
};
