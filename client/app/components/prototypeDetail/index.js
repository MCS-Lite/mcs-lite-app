import React from 'react';

import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './header';
import PrototypeDetailInfo from './info';

import styles from './styles.css';

const Prototypes = ({
  main,
  prototypes,
  createTestDevice,
  createDataChannel,
  deleteDataChannel,
  retrieveUnitTypes,
  createUnitTypes,
  pushToast,
  deleteDevice,
  retrievePrototype,
  uploadPrototypeImage,
  uploadDeviceImage,
  ...props
}) => {
  const {
    prototypeName,
    version,
    prototypeDescription,
    prototypeId,
    prototypeImageURL,
    devicesLength,
    datachannels,
    devices,
    user,
    isTemplate,
  } = prototypes.prototypeDetail;
  const { isAdmin } = main;
  const { unitTypes } = prototypes;
  const readOnly = !isAdmin && isTemplate;
  return (
    <div>
      <div className={styles.base}>
        <Breadcrumb prototypeName={prototypeName} />
        <PrototypeDetailHeader
          user={user}
          prototypeId={prototypeId}
          prototypeName={prototypeName}
          prototypeDescription={prototypeDescription}
          prototypeImageURL={prototypeImageURL}
          prototype={prototypes.prototypeDetail}
          version={version}
          createTestDevice={createTestDevice}
          uploadPrototypeImage={uploadPrototypeImage}
          uploadDeviceImage={uploadDeviceImage}
          pushToast={pushToast}
          readOnly={readOnly}
          isTemplate={isTemplate}
          {...props}
        />
        <PrototypeDetailInfo
          prototypeDescription={prototypeDescription}
          prototypeImageURL={prototypeImageURL}
          devicesLength={devicesLength}
        />
        <PanelContent
          createTestDevice={createTestDevice}
          devices={devices}
          datachannels={datachannels}
          createDataChannel={createDataChannel}
          deleteDataChannel={deleteDataChannel}
          prototypeId={prototypeId}
          retrieveUnitTypes={retrieveUnitTypes}
          createUnitTypes={createUnitTypes}
          unitTypes={unitTypes}
          pushToast={pushToast}
          deleteDevice={deleteDevice}
          retrievePrototype={retrievePrototype}
          uploadDeviceImage={uploadDeviceImage}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default Prototypes;
