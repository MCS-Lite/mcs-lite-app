import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const TestDeviceContentLayout = () => {
  return (
    <div>This is test device content.</div>
  );
}

export default compose(
  pure,
)(TestDeviceContentLayout);