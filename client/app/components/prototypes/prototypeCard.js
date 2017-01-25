import { connect } from 'react-redux';
import React, { Component } from 'react';

import prototypeCardStyles from './prototypeCard.css';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';

import productBanner from './productBanner.png';

const PrototypeCardLayout = () => {
  return (
    <div className={prototypeCardStyles.base}>
      <div>
        <img src={productBanner} className={prototypeCardStyles.img} />
      </div>
      <div className={prototypeCardStyles.content}>
        <h3>React-Native Example</h3>
        <Hr />
          Version: 0.0.1
        <Hr />
        <Button type="submit" className={prototypeCardStyles.button}>
          Detail
        </Button>
      </div>
    </div>
  );
}

export default PrototypeCardLayout;