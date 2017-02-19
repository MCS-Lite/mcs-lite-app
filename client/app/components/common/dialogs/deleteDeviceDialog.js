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
        id="DeleteDeviceDialog.Notice"
        defaultMessage="Notice!"
      />
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
      <img src={notice} className={styles.img}/>
      <div>Are you sure you want to delete? You cannot revert this action.</div>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeDialog}>
        <FormattedMessage
          id="DeleteDeviceDialog.Cancel"
          defaultMessage="Cancel"
        />
      </Button>
      <Button kind="primary" onClick={onDeleteSubmit}>
        <FormattedMessage
          id="DeleteDeviceDialog.Ok"
          defaultMessage="Ok"
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
