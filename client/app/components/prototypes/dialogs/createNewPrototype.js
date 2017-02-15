import React, { Component } from 'react';

import newPrototypeCardStyles from '../newPrototypeCard.css';
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

const CreateNewPrototypeDialog = ({
  isCreatePrototype,
  onVersionChange,
  onPrototypeNameChange,
  onPrototypeDescriptionChange,
  closeCreatePrototype,
  openCreatePrototype,
  prototypeName,
  version,
  prototypeDescription,
  submitCreateNewPrototype,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={isCreatePrototype}
      size="large"
      onHide={closeCreatePrototype}
    >
      <DialogHeader>
        <div>Create Prototype</div>
      </DialogHeader>
      <DialogBody>
        <p>Fill in the following information or
          <a href="">import from JSON file</a>
          .
        </p>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
        <InputText
          required
          value={prototypeName}
          label={t('prototypeName')}
          placeholder={t('inputThePrototypeName')}
          onChange={onPrototypeNameChange}
        />
        <InputText
          required
          value={version}
          label={t('prototypeVersion')}
          placeholder={t('inputThePrototypeVersion')}
          onChange={onVersionChange}
        />
        <InputTextarea
          label={t('prototypeDescription')}
          rows="4"
          value={prototypeDescription}
          style={{ resize: 'none' }}
          placeholder={t('inputThePrototypeDescription')}
          onChange={onPrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeCreatePrototype}>Cancel</Button>
        <Button kind="primary" onClick={submitCreateNewPrototype}>
          {t('save')}
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('prototypeName', 'setPrototypeName', ''),
  withState('version', 'setVersion', ''),
  withState('prototypeDescription', 'setPrototypeDescription', ''),
  withState('prototypeImageURL', 'setPrototypeImageURL', ''),
  withHandlers({
    submitCreateNewPrototype: props => () => {
      props.setIsCreatePrototype(false);
      props.createNewPrototype({
        prototypeName: props.prototypeName,
        version: props.version,
        prototypeDescription: props.prototypeDescription,
        prototypeImageURL: props.prototypeImageURL,
      });
    },
    onVersionChange: props => (e) => props.setVersion(e.target.value),
    onPrototypeDescriptionChange: props => (e) => props.setPrototypeDescription(e.target.value),
    onPrototypeNameChange: props => (e) => props.setPrototypeName(e.target.value),
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    closeCreatePrototype: props => () => props.setIsCreatePrototype(false),
  }),
  withGetMessages(messages, 'Prototypes'),
 )(CreateNewPrototypeDialog)