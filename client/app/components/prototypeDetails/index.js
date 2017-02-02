import { connect } from 'react-redux';
import React, { Component } from 'react';

import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './prototypeDetailHeader';
import PrototypeDetailInfo from './prototypeDetailInfo';

import prototypeDetailStyle from './prototypeDetail.css';

const Prototypes = ({ prototypes,  createTestDevice, ...props }) => {
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
        <PrototypeDetailHeader prototypeId={prototypeId} prototypeName={prototypeName} version={version} createTestDevice={createTestDevice} {...props}/>
        <PrototypeDetailInfo prototypeDescription={prototypeDescription} />
        <PanelContent />
      </div>
      <Footer />
    </div>
  );
}

export default Prototypes;