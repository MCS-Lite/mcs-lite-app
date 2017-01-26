import { connect } from 'react-redux';
import React, { Component } from 'react';
import prototypeBanner from '../prototypes/productBanner.png';
import prototypeDetailInfoStyles from './prototypeDetailInfo.css';

const PrototypeDetailInfoLayout = ({
  prototypeDescription,
}) => {
  return (
    <div className={prototypeDetailInfoStyles.base}>
      <div className={prototypeDetailInfoStyles.info}>
        <img src={prototypeBanner} />
        <div>
          <b>Description:</b> {prototypeDescription}
        </div>
      </div>
      <div className={prototypeDetailInfoStyles.testDevice}>
        <div className={prototypeDetailInfoStyles.testDeviceInfo}>
          <span>1</span>
          <p>Test Device</p>
        </div>
        <div className={prototypeDetailInfoStyles.hint}>
          Create test device or beta release the prototype to try out and collect real data!
        </div>
      </div>
    </div>
  );
}

export default PrototypeDetailInfoLayout;