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

const ClonePrototypeDialog = ({
  selectMenuValue,
  closeClonePrototype,
  clonePrototypeName,
  onClonePrototypeNameChange,
  clonePrototypeDescription,
  onClonePrototypeDescriptionChange,
  prototypeName,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'clone'}
      size="large"
      onHide={closeClonePrototype}
    >
      <DialogHeader>
        <div>Clone from existing prototype</div>
      </DialogHeader>
      <DialogBody>
        <p>To clone from an existing prototype enables you to build a similiar prototype base on the old one.</p>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
        <InputText
          required
          value={clonePrototypeName}
          label="Prototype name"
          placeholder="Input the prototype name."
          onChange={onClonePrototypeNameChange}
        />
        <InputTextarea
          label="prototype description"
          rows="4"
          value={clonePrototypeDescription}
          style={{ resize: 'none' }}
          placeholder="Input the prototype description."
          onChange={onClonePrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeClonePrototype}>Cancel</Button>
        <Button kind="primary" >
          Save
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
  }),
 )(ClonePrototypeDialog)