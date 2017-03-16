import React from 'react';
import { compose, pure, withState } from 'recompose';
import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './card';

import styles from './styles.css';

const filteByName = key => ({ prototypeName }) =>
  prototypeName.toLowerCase().includes(key.toLowerCase());

const Prototypes = ({
  prototypes,
  createNewPrototype,
  retrievePrototypeTemplates,
  retrievePrototypeList,
  clonePrototype,
  filterKey,
  setFilterKey,
  uploadPrototypeImage,
  pushToast,
  exportJSON,
  importJSON,
  ...props
}) => {
  const prototypeTemplates = prototypes.prototypeTemplates;

  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb />
        <PanelHeader
          filterKey={filterKey}
          setFilterKey={setFilterKey}
        />
        <div className={styles.content}>
          <NewPrototypeCard
            createNewPrototype={createNewPrototype}
            clonePrototype={clonePrototype}
            retrievePrototypeTemplates={retrievePrototypeTemplates}
            retrievePrototypeList={retrievePrototypeList}
            prototypeTemplates={prototypeTemplates}
            uploadPrototypeImage={uploadPrototypeImage}
            pushToast={pushToast}
            importJSON={importJSON}
          />
          {
            prototypes.prototypeList.filter(filteByName(filterKey)).map(prototype =>
              <PrototypeCard
                key={prototype.prototypeId}
                prototype={prototype}
                clonePrototype={clonePrototype}
                retrievePrototypeList={retrievePrototypeList}
                uploadPrototypeImage={uploadPrototypeImage}
                pushToast={pushToast}
                exportJSON={exportJSON}
                {...props}
              />,
            )
          }
        </div>
      </div>
    </div>
  );
};

export default compose(
  pure,
  withState('filterKey', 'setFilterKey', ''),
)(Prototypes);
