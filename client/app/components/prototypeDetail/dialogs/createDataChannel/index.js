import React from 'react';

import Button from 'mtk-ui/lib/Button';

import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import InputSelect from 'mtk-ui/lib/InputSelect';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withProps from 'recompose/withProps';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';
import Dialog from '../../../common/dialog';
import { getData } from '../../../../utils/dataChannelTypes';
import { request } from '../../../../utils/fetch';
import Preview from '../../preview';

import styles from './styles.css';

const CreateDataChannelDialog = ({
  isCreateDataChannel,
  closeCreateDataChannel,
  onDataChannelNameChange,
  onDataChannelIdChange,
  onDataChannelDescriptionChange,
  dataChannelName,
  dataChannelId,
  dataChannelDescription,
  checkDatachannelIdAvailable,
  submitCreateDataChannel,
  onDataChannelTypeChange,
  dataChannelType,
  dataChannelTypesOptions,
  format,
  setFormat,
  onFormatChange,
  error,
  setError,
  getMessages: t,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
}) => (
  <Dialog
    show={isCreateDataChannel}
    size="large"
    onHide={closeCreateDataChannel}
    className={styles.dialog}
  >
    <DialogHeader>
      <div>{t('addNewDataChannel')}</div>
    </DialogHeader>
    <DialogBody className={styles.dialogBody}>
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
          error={error.dataChannelName ? error.dataChannelName : ''}
        />
        <InputText
          required
          label={t('dataChannelId')}
          value={dataChannelId}
          placeholder={t('inputDataChannelId')}
          onChange={onDataChannelIdChange}
          error={error.dataChannelId ? error.dataChannelId : ''}
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
          className={styles.input}
          style={{ flex: 1 }}
          error={error.dataChannelType ? t('required') : ''}
          valueRenderer={(value = {}) => {
            let children;
            dataChannelTypesOptions.forEach((k) => {
              if (k.value === value) {
                children = k.children;
              }
            });
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
        retrieveUnitTypes={retrieveUnitTypes}
        createUnitTypes={createUnitTypes}
        unitTypes={unitTypes}
      />
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeCreateDataChannel}>
        {t('cancel')}
      </Button>
      <Button kind="primary" onClick={submitCreateDataChannel}>
        {t('create')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
  withState('dataChannelName', 'setDataChannelName', ''),
  withState('dataChannelId', 'setDataChannelId', ''),
  withState('dataChannelDescription', 'setDataChannelDescription', ''),
  withState('dataChannelType', 'setDataChannelType', ''),
  withState('channelType', 'setChannelType', {}),
  withState('format', 'setFormat', {}),
  withState('error', 'setError', {}),
  withProps(({ displayCardType, getMessages: t }) => {
    const treatedData = getData(t).map((k) => {
      const value = k.type === 1
        ? `${k.dataChannelTypeName}_Control`
        : `${k.dataChannelTypeName}_Display`;
      return { ...k, value };
    });

    const dataChannelTypesOptions = treatedData.reduce((acc, k) => {
      if (displayCardType === k.type) {
        return [
          ...acc,
          { value: k.value, children: k.children },
        ];
      }
      return acc;
    }, []);

    return {
      data: treatedData,
      dataChannelTypesOptions,
    };
  }),
  withHandlers({
    closeCreateDataChannel: props => () => props.setIsCreateDataChannel(false),
    onDataChannelNameChange: props => (e) => {
      props.setError({
        ...props.error,
        dataChannelName: false,
      });
      props.setDataChannelName(e.target.value);
    },
    onDataChannelIdChange: props => (e) => {
      props.setError({
        ...props.error,
        dataChannelId: false,
      });
      props.setDataChannelId(e.target.value);
    },
    onDataChannelDescriptionChange: props => e => props.setDataChannelDescription(e.target.value),
    onDataChannelTypeChange: props => (e, value) => {
      const { dataChannelTypeId, dataChannelTypeName } =
        props.data.find((k = {}) => k.value === value) || {};
      const channelType = {
        id: dataChannelTypeId,
        name: dataChannelTypeName,
      };

      props.setChannelType(channelType);
      props.setDataChannelType(value);
      props.setFormat({});
      props.setError({});
    },
    onFormatChange: props => (key, value) => {
      props.setFormat({
        ...props.format,
        [key]: {
          ...props.format[key],
          value,
        },
      });
      props.setError({
        ...props.error,
        [key]: false,
      });
    },
    submitCreateDataChannel: props => () => {
      props.setError({});
      let data = {};

      data.type = props.displayCardType;
      data.id = props.dataChannelId;
      data.description = props.dataChannelDescription;
      data.name = props.dataChannelName;
      data.format = props.format;
      data.channelType = props.channelType;
      data.isHidden = true;

      let error = {};
      if (data.id === '') error.dataChannelId = props.getMessages('required');
      if (data.name === '') error.dataChannelName = props.getMessages('required');
      if (!data.channelType.id) error.dataChannelType = true;

      Object.keys(props.format).forEach((k) => {
        if (props.format[k].required && (!props.format[k].value || props.format[k].value === '')) {
          error[k] = true;
        }
      });

      if (Object.keys(error).length !== 0) {
        props.setError(error);
      } else {
        props
          .checkDatachannelIdAvailable(props.prototypeId, props.dataChannelId)
          .then(result => {
            if (result === false) {
              props.setError({
                dataChannelId: props.getMessages('dataChannelIdHasBeenUsed'),
              });
            } else {
              props
                .createDataChannel(props.prototypeId, data)
                .then(() =>
                  props.pushToast({
                    kind: 'success',
                    message: props.getMessages('addNewDataChannelSuccess'),
                  }),
                )
                .catch(() =>
                  props.pushToast({
                    kind: 'error',
                    message: props.getMessages('addNewDataChannelFailed'),
                  }),
                );
              props.setIsCreateDataChannel(false);
              props.setIsSelectCreateDataChannel(false);
            }
          });
      }
    },
  }),
)(CreateDataChannelDialog);
