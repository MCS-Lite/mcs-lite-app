import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import messages from '../messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const UseExampleLayout = ({
  getMessages: t,
}) => {
  return (
    <div>
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'Prototypes'),
)(UseExampleLayout)