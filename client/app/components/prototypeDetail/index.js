import { connect } from 'react-redux';
import React, { Component } from 'react';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './prototypeDetailHeader';
import PrototypeDetailInfo from './prototypeDetailInfo';

import prototypeDetailStyle from './prototypeDetail.css';

const Prototypes = ({
  prototypes,
  createTestDevice,
  createDataChannel,
  ...props,
}) => {
  const {
    prototypeName,
    version,
    prototypeDescription,
    prototypeId,
    devicesLength,
    datachannels,
    devices,
  } = prototypes.prototypeDetail;
  return (
    <div>
      <Header
        imageUrl='http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg'/>
      <div className={prototypeDetailStyle.base}>
        <Breadcrumb prototypeName={prototypeName} />
        <PrototypeDetailHeader prototypeId={prototypeId} prototypeName={prototypeName} version={version} createTestDevice={createTestDevice} {...props}/>
        <PrototypeDetailInfo prototypeDescription={prototypeDescription} devicesLength={devicesLength} />
        <PanelContent createTestDevice={createTestDevice} devices={devices} datachannels={datachannels} createDataChannel={createDataChannel} prototypeId={prototypeId} />
      </div>
      <Footer />
    </div>
  );
}

export default Prototypes;