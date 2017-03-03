import React from 'react';
import c from 'classnames';
import { withGetMessages } from 'react-intl-inject-hoc';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import InputText from 'mtk-ui/lib/InputText';

import styles from './styles.css';

import messages from './messages';

const TextDisplayType = ({
  limit,
  required,
  keyName,
  onChange,
  value,
  getMessages: t,
  ...props
}) => (
  <div className={styles.base}>
    <div className={c(required && styles.requiredLabel)}>
      {t(keyName)}
    </div>
    <div>
      <InputText
        className={styles.input}
        onChange={onChange}
        value={value}
        {...props}
      />
    </div>
  </div>
);

export default compose(
  pure,
  withHandlers({
    onChange: props => (e) => {
      props.onSetError(props.keyName);
      props.onFormatChange(props.keyName, e.target.value);
    },
  }),
  withGetMessages(messages, 'Text'),
)(TextDisplayType);
