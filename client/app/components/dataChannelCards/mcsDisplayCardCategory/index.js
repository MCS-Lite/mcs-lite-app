import React from 'react';
import { pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

const DisplayCategoryLayout = ({
  value = '',
  id,
  format,
}) => (
  <DataChannelAdapter
    dataChannelProps={{
      id,
      type: 'CATEGORY_DISPLAY',
      values: { value },
      format,
    }}
  />
);

export default pure(DisplayCategoryLayout);
