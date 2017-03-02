import React from 'react';
import { compose, pure } from 'recompose';
import { DataChannelAdapter } from 'mcs-lite-ui';

import styles from './styles.css';

const PreviewLayout = ({
  value,
}) => (
  <div className={styles.base}>
    <DataChannelAdapter
      dataChannelProps={{
        id: '',
        type: 'SWITCH_CONTROL',
        values: { value },
      }}
    />
  </div>
);

export default compose(
  pure,
)(PreviewLayout);
