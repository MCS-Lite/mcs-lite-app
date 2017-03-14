import React from 'react';
import { compose, pure } from 'recompose';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import Button from 'mtk-ui/lib/Button';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import Dialog from '../../../common/dialog';

const DialogWrapper = ({
  size,
  show,
  title,
  children,
  onCancel,
  onConfirm,
  confirmText,
  dialogBodyClassName,
  getMessages: t,
}) => (
  <Dialog
    show={show}
    size={size}
    onHide={onCancel}
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
