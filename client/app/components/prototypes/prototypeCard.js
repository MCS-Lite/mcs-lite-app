import { connect } from 'react-redux';
import React, { Component } from 'react';

import prototypeCardStyles from './prototypeCard.css';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';

import productBanner from './productBanner.png';

const PrototypeCardLayout = () => {
  return (
    <div className={prototypeCardStyles.base}>
      <div>
        <MiMoreVert className={prototypeCardStyles.more}/>
        <img src={productBanner} className={prototypeCardStyles.img} />
      </div>
      <div className={prototypeCardStyles.content}>
        <h3 className={prototypeCardStyles.prototypeName}>React-Native Example</h3>
        <Hr className={prototypeCardStyles.hr}/>
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