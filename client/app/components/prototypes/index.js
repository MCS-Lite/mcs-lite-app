import { connect } from 'react-redux';
import React, { Component } from 'react';
import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';
import Breadcrumb from './breadcrumb';
import PanelHeader from './PanelHeader';
import NewPrototypeCard from './newPrototypeCard';
import PrototypeCard from './prototypeCard';

import prototypeStyle from './prototypes.css';

const Prototypes = ({ main }) => {
  return (
    <div>
      <Header />
      <div className={prototypeStyle.base}>
        <Breadcrumb />
        <PanelHeader />
        <div className={prototypeStyle.content}>
          <NewPrototypeCard />
          <PrototypeCard />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Prototypes;