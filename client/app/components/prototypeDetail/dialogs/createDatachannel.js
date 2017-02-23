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

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

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
  format,
  setFormat,
  onFormatChange,
  displayCardType,
  error,
  setError,
  getMessages: t,
}) => {
  let dataChannelTypesOptions = [];
  data.forEach((k,v)=>{
    if (displayCardType === k.type) {
      let value = '';
      if (k.type === 1) {
        value = k.dataChannelTypeName + '_Control';
      } else if (k.type ===2){
        value = k.dataChannelTypeName + '_Display';
      }

      dataChannelTypesOptions.push({
        value: value,
        children: k.dataChannelTypeName,
      });
    }
  });

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
            error={error.dataChannelName ? t('required'): ''}
          />
          <InputText
            required
            label={t('dataChannelId')}
            value={dataChannelId}
            placeholder={t('inputDataChannelId')}
            onChange={onDataChannelIdChange}
            error={error.dataChannelId ? t('required'): ''}
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
            filterFunc={() => true}
            className={createDataChannelStyles.input}
            style={{flex: 1}}
            error={error.dataChannelType ? t('required'): ''}
            valueRenderer={(value = {}) => {
              let children;
              dataChannelTypesOptions.forEach((k, v) => {
                if (k.value === value) {
                  children = k.children;
                }
              })
              return children;
            }}
            value={dataChannelType}
            onChange={onDataChannelTypeChange}
          />
        </InputForm>
        <p>{t('templateHint')}</p>
        <Preview
          displayName={dataChannelType}
          format={format}
          setFormat={setFormat}
          error={error}
          setError={setError}
          onFormatChange={onFormatChange}
        />
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
  withState('format', 'setFormat', {}),
  withState('error', 'setError', {}),
  withHandlers({
    closeCreateDataChannel: props => (e) => props.setIsCreateDataChannel(false),
    onDataChannelNameChange: props => (e) => {
      props.error.dataChannelName = false;
      props.setError(props.error);
      props.setDataChannelName(e.target.value)
    },
    onDataChannelIdChange: props => (e) => {
      props.error.dataChannelId = false;
      props.setError(props.error);
      props.setDataChannelId(e.target.value)
    },
    onDataChannelDescriptionChange: props => (e) => props.setDataChannelDescription(e.target.value),
    onDataChannelTypeChange: props => (e, value) => {
      props.setDataChannelType(value);
      props.setFormat({});
      props.setError({});
    },
    onFormatChange: props => (key, value) => {
      props.format[key].value = value;
    },
    submitCreateDataChannel: props => (e) => {
      console.log(props.format);
      props.setError({});
      let data = {};

      data.displayCardType = props.displayCardType;
      data.dataChannelId = props.dataChannelId;
      data.dataChannelDescription = props.dataChannelDescription;
      data.dataChannelName = props.dataChannelName;
      data.format = props.format;

      let error = {};
      if (data.dataChannelId === '') error.dataChannelId = true;
      if (data.dataChannelName === '') error.dataChannelName = true;
      if (!data.dataChannelType) error.dataChannelType = true;
      error.lowerbound = true;
      props.setError(error);
      // prototypeDetailActions.createDataChannel(props.prototypeId, data);
    },
  }),
  withGetMessages(messages, 'PrototypeDetail'),
 )(CreateDataChannelDialog)