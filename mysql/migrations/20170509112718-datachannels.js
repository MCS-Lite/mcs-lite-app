var R = require('ramda');
var schema = require('../datachannels/schema');
var doMigrationFromNeDB = require('../utils').doMigrationFromNeDB;
var sequelize = require('../utils').sequelize;
var path = require('path');

module.exports = {
  up: function(migration, DataTypes, done){
    migration
      .createTable('datachannels', schema, {
        charset: 'utf8'
      })
      .success(function() {
        var table = sequelize.define('datachannels', schema);
        var nedbPath = path.resolve(__dirname, `../../db/datachannels.json`);

        doMigrationFromNeDB(
          nedbPath,
          function(entry) {
            const user = R.merge(entry, {
              createdAt: new Date(entry.createdAt)
                .toISOString()
                .replace('Z', ''),
              updatedAt: new Date(entry.updatedAt)
                .toISOString()
                .replace('Z', ''),
              channelType: JSON.stringify(entry.channelType),
              config: JSON.stringify(entry.config),
              format: JSON.stringify(entry.format)
            });
            return table.create(user);
          },
          done
        );
      });
  },
  down: function(migration, DataTypes, done) {
    done();
  }
};
