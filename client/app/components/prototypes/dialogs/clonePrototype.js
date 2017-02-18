import React, { Component } from 'react';

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

import prototypeStyles from '../prototypes.css';

const ClonePrototypeDialog = ({
  selectMenuValue,
  closeClonePrototype,
  clonePrototypeName,
  onClonePrototypeNameChange,
  clonePrototypeDescription,
  onClonePrototypeDescriptionChange,
  prototypeName,
  submitClonePrototype,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'clone'}
      size="large"
      onHide={closeClonePrototype}
    >
      <DialogHeader>
        <div>{t('cloneFromExistingPrototype')}</div>
      </DialogHeader>
      <DialogBody className={prototypeStyles.dialogBody}>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
        <InputText
          required
          value={clonePrototypeName}
          label={t('prototypeName')}
          placeholder={t('inputThePrototypeName')}
          onChange={onClonePrototypeNameChange}
        />
        <InputTextarea
          label={t('prototypeDescription')}
          rows="4"
          value={clonePrototypeDescription}
          style={{ resize: 'none' }}
          placeholder={t('inputThePrototypeDescription')}
          onChange={onClonePrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeClonePrototype}>{t('cancel')}</Button>
        <Button kind="primary" onClick={submitClonePrototype} >
          {t('save')}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('clonePrototypeName', 'setClonePrototypeName', (props) => props.prototypeName),
  withState('clonePrototypeDescription', 'setClonePrototypeDescription', ''),
  withHandlers({
    onClonePrototypeDescriptionChange: props => (e) => props.setClonePrototypeDescription(e.target.value),
    onClonePrototypeNameChange: props => (e) => props.setClonePrototypeName(e.target.value),
    closeClonePrototype: props => () => props.setSelectMenuValue(''),
    submitClonePrototype: props => () => {
      props.setSelectMenuValue('');
      props.clonePrototype(props.prototypeId, {
        prototypeName: props.clonePrototypeName,
        prototypeDescription: props.clonePrototypeDescription,
      });
    },
  }),
  withGetMessages(messages, 'Prototypes'),
 )(ClonePrototypeDialog)