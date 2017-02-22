import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import InputText from 'mtk-ui/lib/InputText';
const TextDisplayType = ({
  limit,
  type,
  required,
}) => {
  return (
    <InputText limit={limit} type={type} required={required} />
  );
}

export default compose(
  pure,

)(TextDisplayType)

