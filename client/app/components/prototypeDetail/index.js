import React from 'react';

import Footer from '../footer';
import Header from '../header';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './header';
import PrototypeDetailInfo from './info';

import styles from './styles.css';

const Prototypes = ({
  prototypes,
  createTestDevice,
  createDataChannel,
  retrieveUnitTypes,
  createUnitTypes,
  ...props
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
  const { unitTypes } = prototypes;
  return (
    <div>
      <Header
        imageUrl="http://img.mediatek.com/150/mtk.linkit/profile/3492e14e-f0fb-4718-a9a7-a49e95d8cb30.jpeg"
      />
      <div className={styles.base}>
        <Breadcrumb prototypeName={prototypeName} />
        <PrototypeDetailHeader
          prototypeId={prototypeId}
          prototypeName={prototypeName}
          version={version}
          createTestDevice={createTestDevice}
          {...props}
        />
        <PrototypeDetailInfo
          prototypeDescription={prototypeDescription}
          devicesLength={devicesLength}
        />
        <PanelContent
          createTestDevice={createTestDevice}
          devices={devices}
          datachannels={datachannels}
          createDataChannel={createDataChannel}
          prototypeId={prototypeId}
          retrieveUnitTypes={retrieveUnitTypes}
          createUnitTypes={createUnitTypes}
          unitTypes={unitTypes}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Prototypes;
