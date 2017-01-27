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

const EditPrototypeDialog = ({
  selectMenuValue,
  closeEditPrototype,
  editPrototypeName,
  onEditPrototypeNameChange,
  editPrototypeDescription,
  onEditPrototypeDescriptionChange,
  prototypeName,
  editVersion,
  onEditVersionChange,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'edit'}
      size="large"
      onHide={closeEditPrototype}
    >
      <DialogHeader>
        <div>Edit prototype</div>
      </DialogHeader>
      <DialogBody>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
        <InputText
          required
          value={editPrototypeName}
          label="Prototype name"
          placeholder="Input the prototype name."
          onChange={onEditPrototypeNameChange}
        />
        <InputText
          required
          value={editVersion}
          label="Prototype version"
          placeholder="Input the prototype version."
          onChange={onEditVersionChange}
        />
        <InputTextarea
          label="prototype description"
          rows="4"
          value={editPrototypeDescription}
          style={{ resize: 'none' }}
          placeholder="Input the prototype description."
          onChange={onEditPrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeEditPrototype}>Cancel</Button>
        <Button kind="primary" >
          Save
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('editPrototypeName', 'setEditPrototypeName', (props) => props.prototypeName),
  withState('editPrototypeDescription', 'setEditPrototypeDescription', (props) => props.prototypeDescription),
  withState('editVersion', 'setEditVersion', (props) => props.version),
  withHandlers({
    onEditVersionChange: props => (e) => props.setEditVersion(e.target.value),
    onEditPrototypeDescriptionChange: props => (e) => props.setEditPrototypeDescription(e.target.value),
    onEditPrototypeNameChange: props => (e) => props.setEditPrototypeName(e.target.value),
    closeEditPrototype: props => () => props.setSelectMenuValue(''),
  }),
 )(EditPrototypeDialog)