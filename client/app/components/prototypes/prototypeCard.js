import { connect } from 'react-redux';
import React, { Component } from 'react';

import prototypeCardStyles from './prototypeCard.css';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';

import productBanner from './productBanner.png';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';

const PrototypeCardLayout = ({
  prototypeName,
  prototypeId,
  version,
  openPrototypeDetail,
}) => {
  return (
    <div className={prototypeCardStyles.base}>
      <div>
        <MiMoreVert className={prototypeCardStyles.more} />
        <img src={productBanner} className={prototypeCardStyles.img} />
      </div>
      <div className={prototypeCardStyles.content}>
        <h3
          className={prototypeCardStyles.prototypeName}
        >
          {prototypeName}
        </h3>
        <Hr className={prototypeCardStyles.hr}/>
          Version: {version}
        <Hr />
        <Button className={prototypeCardStyles.button} onClick={openPrototypeDetail}>
          Detail
        </Button>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withHandlers({
    openPrototypeDetail: props => () => browserHistory.push('/prototypes/' + props.prototypeId),
  }),
)(PrototypeCardLayout);