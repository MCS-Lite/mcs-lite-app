import { connect } from 'react-redux';
import React, { Component } from 'react';

import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';

import Breadcrumb from './breadcrumb';
import PanelHeader from './panelHeader';
import PrototypeDetailHeader from './prototypeDetailHeader';
import PrototypeDetailInfo from './prototypeDetailInfo';

import prototypeDetailStyle from './prototypeDetail.css';

const Prototypes = ({ prototypes }) => {

  const {
    prototypeName,
    version,
    prototypeDescription,
    prototypeId,
  } = prototypes.prototypeDetail;

  return (
    <div>
      <Header />
      <div className={prototypeDetailStyle.base}>
        <Breadcrumb prototypeName={prototypeName} />
        <PrototypeDetailHeader prototypeId={prototypeId} prototypeName={prototypeName} version={version} />
        <PrototypeDetailInfo prototypeDescription={prototypeDescription} />
        <PanelHeader />
      </div>
      <Footer />
    </div>
  );
}

export default Prototypes;