import React from 'react';
import {
  compose,
  pure,
  withState,
} from 'recompose';
import {
  DataChannelCard,
  DataChannelAdapter,
} from 'mcs-lite-ui';
import moment from 'moment';
import More from '../common/more';

const DisplayHexLayout = ({
  updatedAt,
  value,
  description,
  className,
  title,
  id,
  isPrototype,
  isDevice,
}) => (
  <DataChannelCard
    className={className}
    title={title}
    subtitle={'Last data point time : ' + moment(updatedAt).format('YYYY-MM-DD h:mm')}
    description={description}
    header={<More isPrototype={isPrototype} isDevice={isDevice} />}
  >
    <DataChannelAdapter
      dataChannelProps={{
        id,
        type: 'HEX_DISPLAY',
        values: { value: value },
      }}
    />
  </DataChannelCard>
);


export default compose(
  pure,
  withState('value', 'setValue', (props)=> props.value || ''),
  withState('updatedAt', 'setUpdatedAt', (props)=> props.updatedAt || ''),
)(DisplayHexLayout);
