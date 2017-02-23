import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import Text from '../../displayTypes/text';
import UnitType from '../../displayTypes/unitType';

const FormatWrapper = ({
  displayType,
  ...props,
}) => {
  return (
    <div style={{width: '50%'}}>
      {displayType === 'text' ? <Text {...props} /> : '' }
      {displayType === 'unitType' ? <UnitType {...props} /> : '' }
    </div>
  );
}

export default compose(
  pure,
)(FormatWrapper)