import { connect } from 'react-redux';
import React, { Component } from 'react';

import prototypeDetailHeaderStyles from './prototypeDetailHeader.css';

import Hr from 'mtk-ui/lib/Hr';
import Button from 'mtk-ui/lib/Button';


const PrototypeDetailHeaderLayout = ({
  prototypeName,
  prototypeId,
  version,
}) => {
  return (
    <div className={prototypeDetailHeaderStyles.base}>
      <div className={prototypeDetailHeaderStyles.content}>
        <div className={prototypeDetailHeaderStyles.info}>
          <div className={prototypeDetailHeaderStyles.infoHeader}>
            <h3>{prototypeName}</h3><span> (ID: {prototypeId}) </span>
          </div>
          <div>version: {version} </div>
        </div>
        <div className={prototypeDetailHeaderStyles.option}>
          <Button>
            Create test device
          </Button>
          <Button kind="cancel">
            More
          </Button>
        </div>
      </div>
      <Hr className={prototypeDetailHeaderStyles.hr} />
    </div>
  );
}

export default PrototypeDetailHeaderLayout;