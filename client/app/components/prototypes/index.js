import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './card';

import styles from './styles.css';

const Prototypes = ({ prototypes, createNewPrototype, retrievePrototypeTemplates, ...props }) => {
  const prototypeTemplates = prototypes.prototypeTemplates;

  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={styles.content}>
          <NewPrototypeCard
            createNewPrototype={createNewPrototype}
            retrievePrototypeTemplates={retrievePrototypeTemplates}
            prototypeTemplates={prototypeTemplates}
          />
          {
            prototypes.prototypeList.map(prototype =>
              <PrototypeCard key={prototype.prototypeId} {...prototype} {...props} />,
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Prototypes;
