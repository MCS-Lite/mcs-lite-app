import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import Button from 'mtk-ui/lib/Button';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import notice from './notice.png';

import styles from './deletePrototype.css';

const DeletePrototypeDialog = ({
  selectMenuValue,
  closeDeletePrototype,
  submitDeletePrototype,
  getMessages: t,
}) => (
  <Dialog
    show={selectMenuValue === 'delete'}
    size="small"
    onHide={closeDeletePrototype}
  >
    <DialogHeader>
      <div>{t('notice')}</div>
    </DialogHeader>
    <DialogBody className={styles.content}>
      <img src={notice} className={styles.img} alt="notice" />
      {t('deletePrototype')}
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeDeletePrototype}>{t('cancel')}</Button>
      <Button kind="primary" onClick={submitDeletePrototype}>
        {t('OK')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withHandlers({
    closeDeletePrototype: props => () => props.setSelectMenuValue(''),
    submitDeletePrototype: props => () => {
      props.setSelectMenuValue('');
      props.deletePrototype(props.prototypeId);
    },
  }),
  withGetMessages(messages, 'Prototypes'),
)(DeletePrototypeDialog);
