import React from 'react';

import styles from './styles.css';
import Breadcrumb from './breadcrumb';
import MyPrototype from './myPrototype';
import Examples from './examples';

const Dashboard = ({
  createNewPrototype,
  dashboard,
  clonePrototype,
}) => (
  <div>
    <div className={styles.base}>
      <Breadcrumb />
      <MyPrototype
        createNewPrototype={createNewPrototype}
        userPrototypes={dashboard.userPrototypes}
      />
      <Examples
        clonePrototype={clonePrototype}
        createNewPrototype={createNewPrototype}
        templates={dashboard.templates}
      />
    </div>
  </div>
);

export default Dashboard;
