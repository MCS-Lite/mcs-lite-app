import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import Button from 'mtk-ui/lib/Button';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const InputPrototypeInfoLayout = ({
  onVersionChange,
  onPrototypeNameChange,
  onPrototypeDescriptionChange,
  prototypeName,
  version,
  prototypeDescription,
  submitCreateNewPrototype,
  closeCreatePrototype,
  getMessages: t,
}) => {
  return (
    <div>
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
      <DialogFooter>
        <Button
          kind="cancel"
          onClick={closeCreatePrototype}
        >
          {t('cancel')}
        </Button>
        <Button
          kind="primary"
          onClick={submitCreateNewPrototype}
        >
          {t('save')}
        </Button>
      </DialogFooter>
    </div>
  );
}

export default compose(
  pure,
  withState('prototypeName', 'setPrototypeName', (props) => props.prototypeName || ''),
  withState('version', 'setVersion', (props) => props.version || ''),
  withState('prototypeDescription', 'setPrototypeDescription', (props) => props.prototypeDescription || ''),
  withState('prototypeImageURL', 'setPrototypeImageURL', (props) => props.prototypeImageURL || ''),
  withHandlers({
    submitCreateNewPrototype: props => () => {
      props.setIsCreatePrototype(false);
      props.createNewPrototype({
        prototypeName: props.prototypeName,
        version: props.version,
        prototypeDescription: props.prototypeDescription,
        prototypeImageURL: props.prototypeImageURL,
      }, props.isDashboard);
    },
    onVersionChange: props => (e) => props.setVersion(e.target.value),
    onPrototypeDescriptionChange: props => (e) => props.setPrototypeDescription(e.target.value),
    onPrototypeNameChange: props => (e) => props.setPrototypeName(e.target.value),
  }),
  withGetMessages(messages, 'Dialogs'),
)(InputPrototypeInfoLayout)
