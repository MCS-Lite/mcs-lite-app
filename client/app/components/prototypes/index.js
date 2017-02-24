import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './card';

import styles from './styles.css';

const Prototypes = ({ prototypes, createNewPrototype, retrievePrototypeTemplates, ...props }) => {
  const prototypeTemplates = prototypes.prototypeTemplates;

  return (
    <div>
      <Header
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
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
            prototypes.prototypeList.map((prototype) => {
              return (<PrototypeCard key={prototype.prototypeId} {...prototype} {...props} />);
            })
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Prototypes;
