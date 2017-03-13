import React from 'react';

import styles from './styles.css';
import Breadcrumb from './breadcrumb';
import MyPrototype from './myPrototype';
import Examples from './examples';

const Dashboard = ({
  createNewPrototype,
  uploadPrototypeImage,
  pushToast,
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
        uploadPrototypeImage={uploadPrototypeImage}
        clonePrototype={clonePrototype}
        userPrototypes={dashboard.userPrototypes}
        retrieveDashboard={retrieveDashboard}
        retrievePrototypeTemplates={retrievePrototypeTemplates}
        templates={dashboard.templates}
        pushToast={pushToast}
      />
      <Examples
        clonePrototype={clonePrototype}
        uploadPrototypeImage={uploadPrototypeImage}
        createNewPrototype={createNewPrototype}
        templates={dashboard.templates}
        retrieveDashboard={retrieveDashboard}
        pushToast={pushToast}
      />
    </div>
  </div>
);

export default Dashboard;
