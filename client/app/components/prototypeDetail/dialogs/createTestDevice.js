import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import Button from 'mtk-ui/lib/Button';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import styles from './styles.css';

const CreateTestDeviceDialog = ({
  isCreateTestDevice,
  closeCreateTestDevice,
  submitCreateTestDevice,
  onTestDeviceNameChange,
  onTestDeviceDescriptionChange,
  testDeviceName,
  testDeviceDescription,
  error,
  getMessages: t,
}) => (
  <Dialog
    show={isCreateTestDevice}
    size="large"
    onHide={closeCreateTestDevice}
  >
    <DialogHeader>
      <div>{t('title')}</div>
    </DialogHeader>
    <DialogBody className={styles.body}>
      <InputForm kind="horizontal">
        <InputText
          required
          label={t('name')}
          value={testDeviceName}
          placeholder={t('namePlaceholder')}
          onChange={onTestDeviceNameChange}
          error={error}
          className={styles.input}
        />
        <InputTextarea
          label={t('description')}
          rows="4"
          value={testDeviceDescription}
          placeholder={t('descriptionPlaceholder')}
          onChange={onTestDeviceDescriptionChange}
          className={styles.input}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeCreateTestDevice}>
        {t('cancel')}
      </Button>
      <Button kind="primary" onClick={submitCreateTestDevice}>
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withGetMessages(messages, 'CreateTestDevice'),
  withState('testDeviceName', 'setTestDeviceName', ''),
  withState('testDeviceDescription', 'setTestDeviceDescription', ''),
  withState('error', 'setError', false),
  withHandlers({
    onTestDeviceNameChange: props => (e) => {
      props.setTestDeviceName(e.target.value);
      props.setError(false);
    },
    onTestDeviceDescriptionChange: props => e => props.setTestDeviceDescription(e.target.value),
    closeCreateTestDevice: props => () => props.setIsCreateTestDevice(false),
    submitCreateTestDevice: props => () => {
      if (props.testDeviceName.length === 0) {
        props.setError(true);
      } else {
        const data = {
          deviceName: props.testDeviceName,
          deviceDescription: props.testDeviceDescription,
          deviceImageURL: '',
          prototypeId: props.prototypeId,
        };
        props.createTestDevice(data);
      }
    },
  }),
 )(CreateTestDeviceDialog);
