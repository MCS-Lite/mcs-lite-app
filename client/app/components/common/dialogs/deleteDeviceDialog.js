import React from 'react'
import { FormattedMessage } from 'react-intl'

import Button from 'mtk-ui/lib/Button';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import notice from '../../prototypes/dialogs/notice.png';

import styles from './dialog.css'

const DeleteDeviceDialog = ({
  closeDialog,
  onDeleteSubmit,
}) => (
  <Dialog
    show
    size="small"
    onHide={closeDialog}
  >
    <DialogHeader>
      <FormattedMessage
        id="Dialogs.Notice"
        defaultMessage="注意!"
      />
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <img src={notice} className={styles.img}/>
      <div>
        <FormattedMessage
          id="Dialogs.Notification"
          defaultMessage="是否確定刪除？一但刪除將無法復原。"
        />
      </div>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeDialog}>
        <FormattedMessage
          id="Dialogs.Cancel"
          defaultMessage="取消"
        />
      </Button>
      <Button kind="primary" onClick={onDeleteSubmit}>
        <FormattedMessage
          id="Dialogs.Confirm"
          defaultMessage="確定"
        />
      </Button>
    </DialogFooter>
  </Dialog>
)

export default compose(
  pure,
  withHandlers({
    closeDialog: props => () => props.setSeletedMenuValue('none'),
    onDeleteSubmit: props => () => {
      props.deleteDevice(props.deviceId);
      props.setSeletedMenuValue('none');
    },
  })
)(DeleteDeviceDialog)
