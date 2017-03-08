import React from 'react';
import { compose, pure, withHandlers } from 'recompose';
import { assoc } from 'ramda';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

const InfoForm = ({
  prototypeInfo: {
    prototypeName,
    version,
    prototypeDescription,
  } = {},
  onNameChange,
  onVersionChange,
  onDescriptionChange,
  error,
  getMessages: t,
}) => (
  <InputForm kind="horizontal">
    <InputText
      required
      value={prototypeName}
      label={t('prototypeName')}
      placeholder={t('inputThePrototypeName')}
      onChange={onNameChange}
      className={styles.input}
      error={error}
    />
    <InputText
      value={version}
      label={t('prototypeVersion')}
      placeholder={t('inputThePrototypeVersion')}
      onChange={onVersionChange}
      className={styles.input}
    />
    <InputTextarea
      label={t('prototypeDescription')}
      rows="4"
      value={prototypeDescription}
      placeholder={t('inputThePrototypeDescription')}
      onChange={onDescriptionChange}
      className={styles.textarea}
    />
  </InputForm>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withHandlers({
    onNameChange: props => (e) => {
      props.setPrototypeInfo(assoc('prototypeName', e.target.value, props.prototypeInfo));
      props.setError(false);
    },
    onVersionChange: props => e =>
      props.setPrototypeInfo(assoc('version', e.target.value, props.prototypeInfo)),
    onDescriptionChange: props => e =>
      props.setPrototypeInfo(assoc('prototypeDescription', e.target.value, props.prototypeInfo)),
  }),
)(InfoForm);
