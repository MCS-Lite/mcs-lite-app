import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import ControlNumber from 'mcs-lite-ui/lib/ControlNumber';

const MoreLayout = ({
  format,
}) => {
  let labels = [];
  return (
    <div>
      <ControlNumber
        labels={labels}
      />
    </div>
  );
}

export default compose(
  pure,
)(MoreLayout);