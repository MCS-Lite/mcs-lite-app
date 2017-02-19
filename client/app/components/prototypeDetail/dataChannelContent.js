import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import NewDisplayCard from './newDisplayCard';
import { DataChannelCard, DataChannelAdapter } from 'mcs-lite-ui';

const DataChannelContentLayout = ({
  prototypeId,
}) => {
  return (
    <div>
      <NewDisplayCard prototypeId={prototypeId} />
      <DataChannelCard
        data-width="half"
        title="Title"
        subtitle="Last data point time : 2015-06-12 12:00"
        description="You can input description of controller here. You can input description of You can input description of controller here. You can input description of"
        header={<a href="">Link</a>}
      >
        <DataChannelAdapter
          dataChannelProps={{
            id: 'Integer Control id',
            type: 'Integer_Control',
            values: { value: 50 },
            format: {
              unit: 'ampere',
            },
          }}
          eventHandler={console.log} // eslint-disable-line
        />
      </DataChannelCard>
    </div>
  );
}

export default compose(
  pure,
)(DataChannelContentLayout);