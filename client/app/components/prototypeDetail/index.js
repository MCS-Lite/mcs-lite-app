import React from 'react';
import PropTypes from 'prop-types';
import pure from 'recompose/pure';
import Breadcrumb from './breadcrumb';
import PanelContent from './panelContent';
import PrototypeDetailHeader from './header';
import PrototypeDetailInfo from './info';

import styles from './styles.css';

const Prototypes = ({
  main,
  prototypes,
  createTestDevice,
  checkDatachannelIdAvailable,
  createDataChannel,
  deleteDataChannel,
  retrieveUnitTypes,
  createUnitTypes,
  pushToast,
  deleteDevice,
  retrievePrototype,
  setPrototypeToTemplate,
  uploadPrototypeImage,
  uploadDeviceImage,
  exportJSON,
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
          exportJSON={exportJSON}
          isAdmin={isAdmin}
          setPrototypeToTemplate={setPrototypeToTemplate}
          retrievePrototype={retrievePrototype}
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
          checkDatachannelIdAvailable={checkDatachannelIdAvailable}
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

Prototypes.propTypes = {
  main: PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string,
  }),
  prototypes: PropTypes.object,
  createTestDevice: PropTypes.func,
  checkDatachannelIdAvailable: PropTypes.func,
  createDataChannel: PropTypes.func,
  deleteDataChannel: PropTypes.func,
  retrieveUnitTypes: PropTypes.func,
  createUnitTypes: PropTypes.func,
  pushToast: PropTypes.func,
  deleteDevice: PropTypes.func,
  retrievePrototype: PropTypes.func,
  setPrototypeToTemplate: PropTypes.func,
  uploadPrototypeImage: PropTypes.func,
  uploadDeviceImage: PropTypes.func,
  exportJSON: PropTypes.func,
};

export default pure(Prototypes);
