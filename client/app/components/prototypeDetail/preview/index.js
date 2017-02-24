import React, { Component } from 'react';

import styles from './styles.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import PreviewWrapper from '../../dataChannelCards/common/previewWrapper';
import DisplayTypeWrapper from '../../dataChannelCards/common/displayTypeWrapper';

const PreviewLayout = ({
  displayName,
  format,
  ...props,
}) => {
  return (
    <div>
      <div className={styles.base}>
        <PreviewWrapper
          displayName={displayName}
          format={format}
        />
      </div>
      <div className={styles.format}>
        <DisplayTypeWrapper
          displayName={displayName}
          format={format}
          {...props}
        />
      </div>
    </div>
  );
}

export default compose(
)(PreviewLayout);