import React, { Component } from 'react';

import Button from 'mtk-ui/lib/Button';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import Hr from 'mtk-ui/lib/Hr';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';
import InputSelect from 'mtk-ui/lib/InputSelect';

import prototypeDetailActions from '../../../actions/prototypeDetailActions';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { data } from '../../../utils/dataChannelTypes';
import Preview from '../preview';

import withGetMessages from '../../../utils/withGetMessage';
import messages from '../messages';

let dataChannelTypesOptions = []
data.forEach((k,v)=>{
  dataChannelTypesOptions.push({
    value: k.dataChannelTypeId.toString(),
    children: k.dataChannelTypeName,
  });
});

import createDataChannelStyles from './createDatachannel.css'

const CreateDataChannelDialog = ({
  isCreateDataChannel,
  closeCreateDataChannel,
  onDataChannelNameChange,
  onDataChannelIdChange,
  onDataChannelDescriptionChange,
  dataChannelName,
  dataChannelId,
  dataChannelDescription,
  submitCreateDataChannel,
  onDataChannelTypeChange,
  dataChannelType,
  getMessages: t,
}) => {
  return (
    <Dialog
      show={isCreateDataChannel}
      size="large"
      onHide={closeCreateDataChannel}
    >
      <DialogHeader>
        <div>Create test device</div>
      </DialogHeader>
      <DialogBody className={createDataChannelStyles.dialogBody}>
        <InputForm
          kind="horizontal"
          style={{ backgroundColor: 'white' }}
        >
          <InputText
            required
            label={t('dataChannelName')}
            value={dataChannelName}
            placeholder={t('inputDataChannelName')}
            onChange={onDataChannelNameChange}
          />
          <InputText
            required
            label={t('dataChannelId')}
            value={dataChannelId}
            placeholder={t('inputDataChannelId')}
            onChange={onDataChannelIdChange}
          />
          <InputTextarea
            label={t('description')}
            rows="4"
            value={dataChannelDescription}
            style={{ resize: 'none' }}
            placeholder={t('inputDataChannelDescription')}
            onChange={onDataChannelDescriptionChange}
          />
          <InputSelect
            label={t('dataChannelType')}
            placeholder={t('inputDataChannelType')}
            items={dataChannelTypesOptions}
            value={dataChannelType}
            onChange={onDataChannelTypeChange}
          />
        </InputForm>
        <p>{t('templateHint')}</p>
        <Preview />
      </DialogBody>
      <DialogFooter>
        <Button kind="cancel" onClick={closeCreateDataChannel}>Cancel</Button>
        <Button kind="primary" onClick={submitCreateDataChannel}>
          Create
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('dataChannelName', 'setDataChannelName', ''),
  withState('dataChannelId', 'setDataChannelId', ''),
  withState('dataChannelDescription', 'setDataChannelDescription', ''),
  withState('dataChannelType', 'setDataChannelType', ''),
  withHandlers({
    closeCreateDataChannel: props => (e) => props.setIsCreateDataChannel(false),
    onDataChannelNameChange: props => (e) => props.setDataChannelName(e.target.value),
    onDataChannelIdChange: props => (e) => props.setDataChannelId(e.target.value),
    onDataChannelDescriptionChange: props => (e) => props.setDataChannelDescription(e.target.value),
    onDataChannelTypeChange: props => (e, value) => props.setDataChannelType(value),
    submitCreateDataChannel: props => (e) => {
      let data = {};
      data.displayCardType = props.displayCardType;
      data.dataChannelId = props.dataChannelId;
      data.dataChannelDescription = props.dataChannelDescription;
      data.dataChannelName = props.dataChannelName;

      // prototypeDetailActions.createDataChannel(props.prototypeId, data);
    },
  }),
  withGetMessages(messages, 'PrototypeDetail'),

 )(CreateDataChannelDialog)