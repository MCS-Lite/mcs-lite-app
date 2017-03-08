import React from 'react';
import { compose, pure } from 'recompose';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import Button from 'mtk-ui/lib/Button';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

const DialogWrapper = ({
  size,
  show,
  title,
  children,
  onCancel,
  onConfirm,
  onHide,
  confirmText,
  dialogBodyClassName,
  getMessages: t,
}) => (
  <Dialog
    show={show}
    size={size}
    onHide={onHide}
  >
    <DialogHeader>{title}</DialogHeader>
    <DialogBody className={dialogBodyClassName}>{children}</DialogBody>
    <DialogFooter>
      <Button
        kind="cancel"
        onClick={onCancel}
      >
        {t('cancel')}
      </Button>
      <Button
        kind="primary"
        onClick={onConfirm}
      >
        {confirmText}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
)(DialogWrapper);
