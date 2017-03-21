import React from 'react';
import { compose, pure, withState, withHandlers, withProps } from 'recompose';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import DeleteConfirmDialog from '../../../common/dialogs/deleteConfirmDialog';
import WithDropdownMenu from '../../../common/withDropdownMenu';

import styles from './more.css';

const MoreLayout = ({
  onSelectedMenuValueChange,
  selectedMenuValue,
  setSelectedMenuValue,
  onDeleteDataChannel,
  dropdownItems,
}) => (
  <div className={styles.base}>
    <WithDropdownMenu
      dropdownItems={dropdownItems}
      onChange={onSelectedMenuValueChange}
    >
      <IconMoreVert size={24} className={styles.icon} />
    </WithDropdownMenu>
    {
      selectedMenuValue === 'delete' &&
      <DeleteConfirmDialog
        onDeleteSubmit={onDeleteDataChannel}
        setSelectedMenuValue={setSelectedMenuValue}
      />
    }
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'More'),
  withProps(({ getMessages: t, isPrototype, isDevice, isHistoryShow }) => {
    if (isPrototype) {
      return { dropdownItems: [{ value: 'delete', children: t('delete') }]};
    } else if (isDevice) {
      return {
        dropdownItems: [
          {
            value: 'openHistory',
            children: isHistoryShow ? t('closeHistory') : t('openHistory'),
          },
        ],
      };
    }
    return {};
  }),
  withState('selectedMenuValue', 'setSelectedMenuValue', 'none'),
  withHandlers({
    onSelectedMenuValueChange: props => (value) => {
      props.setSelectedMenuValue(value);
      if (value === 'openHistory') {
        props.onShowHistoryClick();
      }
    },
    onDeleteDataChannel: props => () => {
      props.deleteDataChannel(props.prototypeId, props.dataChannelId)
        .then(() => props.pushToast({ kind: 'success', message: props.getMessages('deleteSuccess') }))
        .catch(() => props.pushToast({ kind: 'error', message: props.getMessages('deleteFailed') }));
      props.setSelectedMenuValue('none');
    },
  }),
)(MoreLayout);
