import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import NewDisplayCard from './newDisplayCard';


const DataChannelContentLayout = ({ prototypeId }) => {
  return (
    <div>
      <NewDisplayCard prototypeId={prototypeId} />
    </div>
  );
}

export default compose(
  pure,
)(DataChannelContentLayout);