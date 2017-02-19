import React from 'react';
import { browserHistory, Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Hr from 'mtk-ui/lib/Hr';
import Button from 'mtk-ui/lib/Button';
import DropdownButton from 'mtk-ui/lib/DropdownButton'

import MiFold from 'mtk-icon/lib/MiFold'

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import EditDeviceDialog from '../common/dialogs/editDeviceDialog';
import DeleteDeviceDialog from '../common/dialogs/deleteDeviceDialog';

import styles from './deviceDetailHeader.css';

const dropdownItems = [
  {
    value: 'edit',
    children: <FormattedMessage
      id="DeviceCard.Edit"
      defaultMessage="編輯"
    />,
  },
  {
    value: 'delete',
    children: <FormattedMessage
      id="DeviceCard.Delete"
      defaultMessage="刪除"
    />,
  },
];

const DeviceDetailHeaderLayout = ({
  deviceId,
  deviceName,
  version,
  userName,
  deviceDescription,
  setSeletedMenuValue,
  createUserId,
  prototypeId,
  onDropdownChange,
  onDropdownClick,
  seletedMenuValue,
  isMenuOpen,
  editDevice,
  deleteDevice,
}) => {
  return (
    <div className={styles.base}>
      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.deviceName}>
            {deviceName}
          </div>
          <div className={styles.otherInfo}>
            <span>
              <FormattedMessage
                id="DeviceDetailHeader.Creater"
                defaultMessage="創建者："
              />
              {userName}
            </span>
            <span>
              <FormattedMessage
                id="DeviceDetailHeader.Version"
                defaultMessage="版本："
              />
              {version}
            </span>
          </div>
        </div>
        <div className={styles.option}>
          <Link to={`/prototypes/${prototypeId}`}>
            <Button>
              <FormattedMessage
                id="DeviceDetailHeader.BackToPrototype"
                defaultMessage="回到產品原型"
              />
            </Button>
          </Link>
          <DropdownButton
            onChange={onDropdownChange}
            onClick={onDropdownClick}
            buttonProps={{ kind: 'cancel' }}
            items={dropdownItems}
            className={styles.dropdownButton}
            menuClassName={styles.dropdownMenu}
          >
            <FormattedMessage
              id="DeviceDetailHeader.BackToPrototype"
              defaultMessage="更多"
            />
            <MiFold size={18} />
          </DropdownButton>
        </div>
      </div>
      <Hr className={styles.hr} />
      {
        seletedMenuValue === 'edit' &&
        <EditDeviceDialog
          deviceId={deviceId}
          deviceName={deviceName}
          deviceDescription={deviceDescription}
          setSeletedMenuValue={setSeletedMenuValue}
          editDevice={editDevice}
        />
      }
      {
        seletedMenuValue === 'delete' &&
        <DeleteDeviceDialog
          deviceId={deviceId}
          setSeletedMenuValue={setSeletedMenuValue}
          deleteDevice={deleteDevice}
        />
      }
    </div>
  );
}

export default compose(
  pure,
  withState('isDeleteTestDevice', 'setIsDeleteTestDevice', false),
  withState('isMenuOpen', 'setIsMenuOpen', false),
  withState('seletedMenuValue', 'setSeletedMenuValue', 'none'),
  withHandlers({
    backToPrototype: props => () => browserHistory.push('/prototypes/' + props.prototypeId),
    onDropdownChange: props => (e, value) => props.setSeletedMenuValue(value),
    onDropdownClick: props => () => props.setIsMenuOpen(!props.isMenuOpen),
  }),
)(DeviceDetailHeaderLayout);
