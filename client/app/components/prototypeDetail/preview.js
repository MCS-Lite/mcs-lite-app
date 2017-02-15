import React, { Component } from 'react';

import previewStyles from './preview.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const PreviewLayout = ({
  config,
}) => {
  return (
    <div>
      <div className={previewStyles.base}>
      123123
      </div>
      <div className={previewStyles.format}>
      123123
      </div>
    </div>
  );
}

export default compose(
  pure,
)(PreviewLayout);