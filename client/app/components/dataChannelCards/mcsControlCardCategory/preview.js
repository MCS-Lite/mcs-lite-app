import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import DataChannelAdapter from 'mcs-lite-ui/lib/DataChannelAdapter';

const PreviewLayout = ({
  value,
  format,
}) => {
  let labels = [];
  return (
    <div style={{ width: '100%' }}>
      <DataChannelAdapter
        dataChannelProps={{
          id: '',
          type: 'CATEGORY_CONTROL',
          values: { value: value },
          format: {
            items: format.items,
          },
        }}
        eventHandler={console.log}
      />
    </div>
  );
}

export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || ''),
  withState('format', 'setFormat', (props) => {
    props.format.items = [];
    if (!props.format.categoryNumber) {
      props.format.categoryNumber = 2;
    }
    for (var i = 0; i< props.format.categoryNumber; i++) {
      props.format.items.push({name: '', value: ''});
    }
    return props.format;
  }),
)(PreviewLayout);