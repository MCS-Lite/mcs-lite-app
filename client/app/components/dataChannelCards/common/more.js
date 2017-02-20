import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';

const MoreLayout = ({
  setIsOpen,
  isOpen,
}) => {
  return (
    <div>
      <IconMoreVert
        onClick={()=>{setIsOpen(!isOpen)}}
        style={{ color: '#0080B4', fontSize: 24 }} />

    </div>
  );
}

export default compose(
  pure,
  withState('isOpen', 'setIsOpen', false),
)(MoreLayout)
