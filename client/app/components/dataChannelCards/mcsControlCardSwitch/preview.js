import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

import styles from './styles.css';

const PreviewLayout = ({
  value,
}) => {
  let labels = [];
  return (
    <div className={styles.base}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'SWITCH_CONTROL',
          values: { value: value },
        }}
        eventHandler={console.log}
      />
    </div>
  );
}

export default compose(
  pure,
)(PreviewLayout);