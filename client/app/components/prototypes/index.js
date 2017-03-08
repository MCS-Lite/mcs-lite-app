import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './card';

import styles from './styles.css';

const Prototypes = ({
  prototypes,
  createNewPrototype,
  retrievePrototypeTemplates,
  retrievePrototypeList,
  clonePrototype,
  ...props
}) => {
  const prototypeTemplates = prototypes.prototypeTemplates;

  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={styles.content}>
          <NewPrototypeCard
            createNewPrototype={createNewPrototype}
            clonePrototype={clonePrototype}
            retrievePrototypeTemplates={retrievePrototypeTemplates}
            retrievePrototypeList={retrievePrototypeList}
            prototypeTemplates={prototypeTemplates}
          />
          {
            prototypes.prototypeList.map(prototype =>
              <PrototypeCard
                key={prototype.prototypeId}
                prototype={prototype}
                clonePrototype={clonePrototype}
                retrievePrototypeList={retrievePrototypeList}
                {...props}
              />,
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Prototypes;
