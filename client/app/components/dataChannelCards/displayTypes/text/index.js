import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import styles from './styles.css';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import InputText from 'mtk-ui/lib/InputText';

const TextDisplayType = ({
  limit,
  keyName,
  onChange,
  value,
  getMessages: t,
  ...props,
}) => {
  return (
    <div className={styles.base}>
      {t(keyName)}
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
}

export default compose(
  pure,
  withHandlers({
    onChange: (props) => (e) => {
      props.onSetError(props.keyName);
      props.onFormatChange(props.keyName, e.target.value);
    },
  }),
  withGetMessages(messages, 'Text'),
)(TextDisplayType)

