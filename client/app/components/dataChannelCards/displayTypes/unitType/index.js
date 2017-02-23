import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import InputSelect from 'mtk-ui/lib/InputText';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

const TextDisplayType = ({
  limit,
  type,
  required,
  getMessages: t,
}) => {
  return (
    <div>
      {t('unitType')}
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'UnitType'),
)(TextDisplayType)

