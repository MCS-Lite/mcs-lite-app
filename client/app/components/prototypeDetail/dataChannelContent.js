import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import NewDisplayCard from './newDisplayCard';

import DisplayCardInteger from '../dataChannelCards/mcsDisplayCardInteger';
import DisplayCardString from '../dataChannelCards/mcsDisplayCardString';
import DisplayCardHex from '../dataChannelCards/mcsDisplayCardHex';
import DisplayCardPWM from '../dataChannelCards/mcsDisplayCardPWM';
import DisplayCardGPIO from '../dataChannelCards/mcsDisplayCardGPIO';
import DisplayCardFloat from '../dataChannelCards/mcsDisplayCardFloat';
import DisplayCardCategory from '../dataChannelCards/mcsDisplayCardCategory';
import ControlCardCategory from '../dataChannelCards/mcsControlCardCategory';
import ControlCardString from '../dataChannelCards/mcsControlCardString';
import ControlCardFloat from '../dataChannelCards/mcsControlCardFloat';
import ControlCardHex from '../dataChannelCards/mcsControlCardHex';
import ControlCardPWM from '../dataChannelCards/mcsControlCardPWM';
import ControlCardGPIO from '../dataChannelCards/mcsControlCardGPIO';
import ControlCardInteger from '../dataChannelCards/mcsControlCardInteger';

import PrototypeDetailStyles from './prototypeDetail.css';

const DataChannelContentLayout = ({
  prototypeId,
}) => {
  return (
    <div className={PrototypeDetailStyles.dataChannelContent}>
      <NewDisplayCard prototypeId={prototypeId} />
      <DisplayCardInteger
        className={PrototypeDetailStyles.displayCard}
        value={50}
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardString
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardHex
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardPWM
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardGPIO
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardFloat
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardCategory
        className={PrototypeDetailStyles.displayCard}
        value="abcd"
        updatedAt={1487505857839}
        description="123123"
      />
    </div>
  );
}

export default compose(
  pure,
)(DataChannelContentLayout);