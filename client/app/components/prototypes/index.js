import React, { Component } from 'react';

import Footer from '../footer';
import LayoutHeader from '@mtk/mcs-components/lib/LayoutHeader';

import Breadcrumb from './breadcrumb';
import PanelHeader from './PanelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './prototypeCard';

import prototypeStyle from './prototypes.css';

const Prototypes = ({ prototypes, ...props }) => {
  return (
    <div>
      <LayoutHeader
        isManager
        logoutFn={()=>{}}
        nickname='evenchange4'
        numberOfCards={3}
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'>
      </LayoutHeader>
      <div className={prototypeStyle.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={prototypeStyle.content}>
          <NewPrototypeCard />
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