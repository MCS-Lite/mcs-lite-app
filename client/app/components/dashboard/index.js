import React from 'react';

import styles from './styles.css';
import Breadcrumb from './breadcrumb';
import MyPrototype from './myPrototype';
import Examples from './examples';

const Dashboard = ({
  createNewPrototype,
  dashboard,
  clonePrototype,
  retrieveDashboard,
  retrievePrototypeTemplates,
}) => (
  <div>
    <div className={styles.base}>
      <Breadcrumb />
      <MyPrototype
        createNewPrototype={createNewPrototype}
        clonePrototype={clonePrototype}
        userPrototypes={dashboard.userPrototypes}
        retrieveDashboard={retrieveDashboard}
        retrievePrototypeTemplates={retrievePrototypeTemplates}
        templates={dashboard.templates}
      />
      <Examples
        clonePrototype={clonePrototype}
        createNewPrototype={createNewPrototype}
        templates={dashboard.templates}
        retrieveDashboard={retrieveDashboard}
      />
    </div>
  </div>
);

export default Dashboard;
