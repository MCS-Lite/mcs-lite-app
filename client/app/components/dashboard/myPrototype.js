import React, { Component } from 'react';
import myPrototypeStyles from './myPrototype.css';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Button from 'mtk-ui/lib/Button';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

import Hr from '../common/hr';

import { browserHistory } from 'react-router';
import c from 'classnames';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';
import CreateNewPrototypeDialog from '../prototypes/dialogs/createNewPrototype';

import productBanner from '../prototypes/productBanner.png';

import moment from 'moment';
import DeviceList from './deviceList';

import IconChevronRight from 'mcs-lite-icon/lib/IconChevronRight';

const MyPrototypeLayout = ({
  getMessages: t,
  createNewPrototype,
  isCreatePrototype,
  setIsCreatePrototype,
  openCreatePrototype,
  userPrototypes,
  goToPrototypeList,
  goToPrototypeDetail,
  isDeviceList,
  setIsDeviceList,
}) => {
  return (
    <div className={myPrototypeStyles.base}>
      <CreateNewPrototypeDialog
        createNewPrototype={createNewPrototype}
        isCreatePrototype={isCreatePrototype}
        setIsCreatePrototype={setIsCreatePrototype}
        isDashboard
      />
      <Panel>
        <PanelHeader className={myPrototypeStyles.panelHeader}>
          <PanelIcon iconName="bookmark" />
          <span>{t('myPrototype')}</span>
        </PanelHeader>
      </Panel>
      <PanelBody>
        <div className={myPrototypeStyles.header}>
          {t('lastUpdatePrototype')}
          <a onClick={goToPrototypeList}className={myPrototypeStyles.link}>{t('allPrototypes')}</a>
        </div>
        <Hr />
        {
          userPrototypes.prototypeId ?
            <div>
              <div className={myPrototypeStyles.prototypeContent}>
                <Table>
                  <TableRow className={myPrototypeStyles.tableRow}>
                    <TableCell style={{ padding: 0, maxWidth: 113 }}>
                      <img src={productBanner} className={myPrototypeStyles.prototypeImg} />
                    </TableCell>
                    <TableCell className={myPrototypeStyles.tableCell}>
                      {t('prototypeName')}
                      <a
                        onClick={goToPrototypeDetail}
                        className={myPrototypeStyles.link}>
                        {userPrototypes.prototypeName}
                      </a>
                    </TableCell>
                    <TableCell className={c(myPrototypeStyles.tableCell, myPrototypeStyles.updatedAt)}>
                      <div style={{ width: 113 }}>
                        {t('lastUpdateTime')}
                        <p>{moment(userPrototypes.updatedAt).format('YYYY-MM-DD h:mm')}</p>
                      </div>
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
              <a
                className={myPrototypeStyles.link}
                onClick={()=> setIsDeviceList(!isDeviceList)}
              >{t('testDeviceList')}</a>
              {
                isDeviceList ?
                <Table>
                  <TableHeader>
                    <TableCell>{t('deviceName')}</TableCell>
                    <TableCell>{t('deviceId')}</TableCell>
                    <TableCell>{t('deviceKey')}</TableCell>
                    <TableCell>{t('lastDataPointTime')}</TableCell>
                  </TableHeader>
                  {
                    userPrototypes.devices.length === 0 ?
                      <div style={{marginTop: 40, marginBottom: 20, textAlign: 'center' }}>{t('noAnyDevice')}</div>
                    :
                      userPrototypes.devices.map((device) => {
                        return (
                          <DeviceList device={device} key={device.deviceId} />
                        );
                      })
                  }
                </Table>
                : ''
              }
            </div>
          :
            <div className={myPrototypeStyles.noAnyPrototypes}>
              <p>{t('noAnyPrototypes')}</p>
              <Button type="submit" className={myPrototypeStyles.button} onClick={openCreatePrototype}>
                {t('create')}
              </Button>
            </div>
        }
      </PanelBody>
    </div>
  );
}

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withState('isDeviceList', 'setIsDeviceList', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    goToPrototypeList: props => () => browserHistory.push('/prototypes'),
    goToPrototypeDetail: props => () => browserHistory.push('/prototypes/' + props.userPrototypes.prototypeId),
  }),
  withGetMessages(messages, 'Dashboard'),
)(MyPrototypeLayout);