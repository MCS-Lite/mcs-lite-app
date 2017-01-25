import { connect } from 'react-redux';
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

const CreateNewPrototypeDialog = ({
  isCreatePrototype,
  onVersionChange,
  onPrototypeNameChange,
  onPrototypeDescriptionChange,
  prototypeName,
  closeCreatePrototype,
  openCreatePrototype,
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
          label="Prototype name"
          placeholder="Input the prototype name."
          onChange={onPrototypeNameChange}
        />
        <InputText
          required
          label="Prototype version"
          placeholder="Input the prototype version."
          onChange={onVersionChange}
        />
        <InputTextarea
          label="prototype description"
          rows="4"
          style={{ resize: 'none' }}
          placeholder="Input the prototype description."
          onChange={onPrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeCreatePrototype}>Cancel</Button>
        <Button kind="primary" onClick={openCreatePrototype}>
          Save
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
  withHandlers({
    onVersionChange: props => (e) => props.setVersion(e.target.value),
    onPrototypeDescriptionChange: props => (e) => props.setPrototypeDescription(e.target.value),
    onPrototypeNameChange: props => (e) => props.setPrototypeName(e.target.value),
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    closeCreatePrototype: props => () => props.setIsCreatePrototype(false),
  }),
 )(CreateNewPrototypeDialog)