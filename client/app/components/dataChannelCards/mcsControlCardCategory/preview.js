import React from 'react';
import { compose, pure, withState } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const PreviewLayout = ({
  value,
  format,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id: '',
      type: 'CATEGORY_CONTROL',
      values: { value },
      format: {
        items: format.items,
      },
    }}
  />
);

export default compose(
  pure,
  withState('value', 'setValue', props => props.value || ''),
  withState('format', 'setFormat', (props) => {
    props.format.items = [];
    if (!props.format.categoryNumber) {
      props.format.categoryNumber = 2;
    }
    for (let i = 0; i < props.format.categoryNumber; i++) {
      props.format.items.push({ name: '', value: '' });
    }
    return props.format;
  }),
)(PreviewLayout);
