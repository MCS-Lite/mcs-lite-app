import React, { Component } from 'react';

import deletePrototypeStyles from './deletePrototype.css';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import messages from '../messages';
import withGetMessages from '../../../utils/withGetMessage';

import notice from './notice.png';

const DeletePrototypeDialog = ({
  selectMenuValue,
  closeDeletePrototype,
  submitDeletePrototype,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'delete'}
      size="small"
      onHide={closeDeletePrototype}
    >
      <DialogHeader>
        <div>{t('notice')}</div>
      </DialogHeader>
      <DialogBody className={deletePrototypeStyles.content}>
        <img src={notice} className={deletePrototypeStyles.img}/>
        <p>{t('deletePrototype')}</p>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeDeletePrototype}>{t('cancel')}</Button>
        <Button kind="primary" onClick={submitDeletePrototype}>
          {t('OK')}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

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
 )(DeletePrototypeDialog)