import React from 'react';
import c from 'classnames';
import { browserHistory, Link } from 'react-router';
import { compose, pure, withState, withHandlers, withProps } from 'recompose';
import IconFold from 'mcs-lite-icon/lib/IconFold';
import Hr from 'mtk-ui/lib/Hr';
import { Button } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import EditDeviceDialog from '../../common/dialogs/editDeviceDialog';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';
import WithDropdownMenu from '../../common/withDropdownMenu';

import styles from './styles.css';

const DeviceDetailHeaderLayout = ({
  deviceId,
  deviceName,
  version,
  userName,
  deviceDescription,
  deviceImageURL,
  setSelectedMenuValue,
  prototypeId,
  onMenuChange,
  onMenuShowChange,
  isMenuShow,
  selectedMenuValue,
  editDevice,
  onDeleteDevice,
  dropdownItems,
  uploadDeviceImage,
  pushToast,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.deviceName}>
          {deviceName}
        </div>
        <div className={styles.otherInfo}>
          <span>{t('creator')}{userName}</span>
          <span>{t('version')}{version}</span>
        </div>
      </div>
      <div className={styles.option}>
        <Link to={`/prototypes/${prototypeId}`}>
          <Button>{t('backToPrototype')}</Button>
        </Link>
        <WithDropdownMenu
          dropdownItems={dropdownItems}
          onChange={onMenuChange}
          onMenuShowChange={onMenuShowChange}
          menuClassName={styles.menu}
        >
          <Button kind="default">
            <div
              className={c(
                styles.dropdownButtonContent,
                isMenuShow && styles.dropdownOpen,
              )}
            >
              {t('more')}<IconFold size={18} />
            </div>
          </Button>
        </WithDropdownMenu>
      </div>
    </div>
    <Hr className={styles.hr} />
    {
      selectedMenuValue === 'edit' &&
      <EditDeviceDialog
        deviceId={deviceId}
        deviceName={deviceName}
        deviceDescription={deviceDescription}
        deviceImageURL={deviceImageURL}
        setSelectedMenuValue={setSelectedMenuValue}
        editDevice={editDevice}
        uploadDeviceImage={uploadDeviceImage}
        pushToast={pushToast}
      />
    }
    {
      selectedMenuValue === 'delete' &&
      <DeleteConfirmDialog
        setSelectedMenuValue={setSelectedMenuValue}
        onDeleteSubmit={onDeleteDevice}
      />
    }
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'DeviceDetail'),
  withState('isDeleteTestDevice', 'setIsDeleteTestDevice', false),
  withState('isMenuShow', 'setIsMenuShow', false),
  withState('selectedMenuValue', 'setSelectedMenuValue', 'none'),
  withProps(({ getMessages: t }) => ({
    dropdownItems: [
      { value: 'edit', children: t('edit') },
      { value: 'delete', children: t('delete') },
    ],
  })),
  withHandlers({
    backToPrototype: props => () => browserHistory.push(`/prototypes/${props.prototypeId}`),
    onDeleteDevice: props => () => {
      props.deleteDevice(props.deviceId);
      props.setSelectedMenuValue('none');
    },
    onMenuChange: props => value => props.setSelectedMenuValue(value),
    onMenuShowChange: props => value => props.setIsMenuShow(value),
  }),
)(DeviceDetailHeaderLayout);
