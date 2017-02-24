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
import { withGetMessages } from 'react-intl-inject-hoc';

import prototypeStyles from '../styles.css';

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
  submitEditPrototype,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={selectMenuValue === 'edit'}
      size="large"
      onHide={closeEditPrototype}
    >
      <DialogHeader>
        <div>{t('editPrototype')}</div>
      </DialogHeader>
      <DialogBody className={prototypeStyles.dialogBody}>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
        <InputText
          required
          value={editPrototypeName}
          label={t('prototypeName')}
          placeholder={t('inputThePrototypeName')}
          onChange={onEditPrototypeNameChange}
        />
        <InputText
          required
          value={editVersion}
          label={t('prototypeVersion')}
          placeholder={t('inputThePrototypeVersion')}
          onChange={onEditVersionChange}
        />
        <InputTextarea
          label={t('prototypeDescription')}
          rows="4"
          value={editPrototypeDescription}
          style={{ resize: 'none' }}
          placeholder={t('inputThePrototypeDescription')}
          onChange={onEditPrototypeDescriptionChange}
        />
        </InputForm>
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeEditPrototype}>{t('cancel')}</Button>
        <Button kind="primary" onClick={submitEditPrototype}>
          {t('save')}
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
    submitEditPrototype: props => () => {
      props.setSelectMenuValue('');
      props.editPrototype(props.prototypeId, {
        prototypeName: props.editPrototypeName,
        prototypeDescription: props.editPrototypeDescription,
        version: props.editVersion,
      });
    },
  }),
  withGetMessages(messages, 'Prototypes'),
 )(EditPrototypeDialog)