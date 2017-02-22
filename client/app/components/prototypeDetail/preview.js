import React, { Component } from 'react';

import previewStyles from './preview.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import PreviewWrapper from '../dataChannelCards/common/previewWrapper';
import DisplayTypeWrapper from '../dataChannelCards/common/displayTypeWrapper';

const PreviewLayout = ({
  config,
  displayName,
  format,
  setFormat,
  onFormatChange,
}) => {
  return (
    <div>
      <div className={previewStyles.base}>
        <PreviewWrapper displayName={displayName} format={format} />
      </div>
      <div className={previewStyles.format}>
        <DisplayTypeWrapper displatName={displayName} format={format} setFormat={setFormat} onFormatChange={onFormatChange} />
      </div>
    </div>
  );
}

export default compose(
  // withHandlers({
    
  // }),
)(PreviewLayout);