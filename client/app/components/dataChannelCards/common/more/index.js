import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import Menu from 'mtk-ui/lib/Menu';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import DeleteConfirmDialog from '../../../common/dialogs/deleteConfirmDialog';

import styles from './more.css';

const MoreLayout = ({
  onMoreClick,
  isOpen,
  onSelectedMenuValueChange,
  selectedMenuValue,
  setSelectedMenuValue,
  onDeleteDataChannel,
  isPrototype,
  isDevice,
  getMessages: t,
}) => {
  let items = [];

  if (isPrototype) {
    items = [
      { value: 'edit', children: t('edit') },
      { value: 'delete', children: t('delete') },
    ];
  } else if (isDevice) {
    items = [];
  }

  return (
    <div className={styles.base} onClick={onMoreClick}>
      <IconMoreVert size={24} className={styles.icon} />
      {
        isOpen &&
        <div>
          <div className={styles.backdrop} />
          <Menu
            className={styles.menu}
            onChange={onSelectedMenuValueChange}
            items={items}
          />
        </div>
      }
      {
        selectedMenuValue === 'delete' &&
        <DeleteConfirmDialog
          onDeleteSubmit={onDeleteDataChannel}
          setSelectedMenuValue={setSelectedMenuValue}
        />
      }
    </div>
  );
};

export default compose(
  pure,
  withGetMessages(messages, 'More'),
  withState('isOpen', 'setIsOpen', false),
  withState('selectedMenuValue', 'setSelectedMenuValue', 'none'),
  withHandlers({
    onMoreClick: props => () => props.setIsOpen(!props.isOpen),
    onSelectedMenuValueChange: props => (e, value) => {
      props.setSelectedMenuValue(value);
      props.setIsOpen(false);
    },
    onDeleteDataChannel: props => () => {
      props.deleteDataChannel(props.prototypeId, props.dataChannelId)
        .then(() => props.pushToast({ kind: 'success', message: props.getMessages('deleteSuccess') }))
        .catch(() => props.pushToast({ kind: 'error', message: props.getMessages('deleteFailed') }));
      props.setSelectedMenuValue('none');
    },
  }),
)(MoreLayout);
