import React from 'react';
import c from 'classnames';
import { Link } from 'react-router';
import moment from 'moment';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Button from 'mtk-ui/lib/Button';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import IconFold from 'mcs-lite-icon/lib/IconFold';
import Heading from 'mcs-lite-ui/lib/Heading';
import IconOverview from 'mcs-lite-icon/lib/IconOverview';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import { withGetMessages } from 'react-intl-inject-hoc';
import defaultBanner from 'images/banner.svg';
import messages from '../messages';

import CreatePrototype from '../../common/dialogs/createPrototype';
import Hr from '../../common/hr';
import DeviceList from '../deviceList';

import styles from './styles.css';

const LastUpdatePrototype = pure(({
  devices,
  prototypeId,
  prototypeName,
  prototypeImageURL,
  updatedAt,
  isDeviceListShow,
  setIsDeviceListShow,
  t,
}) => (
  <div>
    <div className={styles.prototypeContent}>
      <img
        src={
          prototypeImageURL
          ? window.apiUrl.replace('api', 'images/') + prototypeImageURL
          : defaultBanner
        }
        className={styles.prototypeImg}
        alt="banner"
      />
      <div className={styles.cell}>
        <span>{t('prototypeName')}</span>
        <Link
          to={`/prototypes/${prototypeId}`}
          className={styles.link}
        >
          {prototypeName}
        </Link>
      </div>
      <div className={styles.cell}>
        <span>{t('lastUpdateTime')}</span>
        <div>{moment(updatedAt).format('YYYY-MM-DD h:mm')}</div>
      </div>
    </div>
    <a
      className={c(
        styles.link,
        isDeviceListShow && styles.listOpen,
      )}
      onClick={() => setIsDeviceListShow(!isDeviceListShow)}
    >
      {t('testDeviceList')}
      <IconFold size={18} />
    </a>
    {
      isDeviceListShow &&
        <Table className={styles.deviceList}>
          <TableHeader>
            <TableCell>{t('deviceName')}</TableCell>
            <TableCell>{t('deviceId')}</TableCell>
            <TableCell>{t('deviceKey')}</TableCell>
            <TableCell>{t('lastDataPointTime')}</TableCell>
          </TableHeader>
          {
            devices.length === 0
            ? <div className={styles.noDevices}>{t('noAnyDevice')}</div>
            :
              devices.map(device => (
                <DeviceList
                  deviceId={device.deviceId}
                  deviceKey={device.deviceKey}
                  updatedAt={device.updatedAt}
                  deviceName={device.deviceName}
                  key={device.deviceId}
                />
              ))
          }
        </Table>
    }
  </div>
));

const MyPrototypeLayout = ({
  getMessages: t,
  isCreatePrototype,
  openCreatePrototype,
  userPrototypes,
  isDeviceListShow,
  setIsDeviceListShow,
  onCreate,
  onClone,
  onCancel,
  retrievePrototypeTemplates,
  templates,
  uploadPrototypeImage,
  pushToast,
}) => (
  <div className={styles.base}>
    {
      isCreatePrototype &&
        <CreatePrototype
          type="new"
          onCreate={onCreate}
          onClone={onClone}
          onCancel={onCancel}
          retrievePrototypeTemplates={retrievePrototypeTemplates}
          templates={templates}
          uploadPrototypeImage={uploadPrototypeImage}
          pushToast={pushToast}
        />
    }
    <Panel>
      <PanelHeader className={styles.panelHeader}>
        <PanelIcon icon={<IconOverview />} />
        <span>{t('myPrototype')}</span>
      </PanelHeader>
    </Panel>
    <PanelBody>
      <div className={styles.header}>
        <Heading level={4}>
          {t('lastUpdatePrototype')}
        </Heading>
        <Link
          to="/prototypes"
          className={styles.link}
        >
          {t('allPrototypes')}
        </Link>
      </div>
      <Hr />
      {
        userPrototypes.prototypeId ?
          <LastUpdatePrototype
            prototypeName={userPrototypes.prototypeName}
            prototypeId={userPrototypes.prototypeId}
            prototypeImageURL={userPrototypes.prototypeImageURL}
            devices={userPrototypes.devices}
            updatedAt={userPrototypes.updatedAt}
            isDeviceListShow={isDeviceListShow}
            setIsDeviceListShow={setIsDeviceListShow}
            t={t}
          />
        :
          <div className={styles.noAnyPrototypes}>
            <p>{t('noAnyPrototypes')}</p>
            <Button type="submit" className={styles.button} onClick={openCreatePrototype}>
              {t('create')}
            </Button>
          </div>
      }
    </PanelBody>
  </div>
);

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withState('isDeviceListShow', 'setIsDeviceListShow', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    onCreate: props => data => props.createNewPrototype(data)
      .then(() => props.retrieveDashboard()),
    onClone: props => (id, data) => props.clonePrototype(id, data)
      .then(() => props.retrieveDashboard()),
    onCancel: props => () => props.setIsCreatePrototype(false),
  }),
  withGetMessages(messages, 'Dashboard'),
)(MyPrototypeLayout);
