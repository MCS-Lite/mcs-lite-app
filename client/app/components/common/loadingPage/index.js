import React from 'react';

import Spin from 'mcs-lite-ui/lib/Spin';
import IconLoading from 'mcs-lite-icon/lib/IconLoading';

import styles from './styles.css';

const LoadingPage = () => (
  <div className={styles.base}>
    <Spin>
      <IconLoading size={90} />
    </Spin>
  </div>
);

export default LoadingPage;
