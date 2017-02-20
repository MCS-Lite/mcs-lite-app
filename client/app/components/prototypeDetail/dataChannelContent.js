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
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={50}
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardString
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="This is string!"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardHex
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="WQEQWEQE123i123i123sqweqweQWEQEW"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardPWM
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="200"
        period={100}
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardGPIO
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={0}
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardFloat
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="0.0"
        updatedAt={1487505857839}
        description="123123"
      />
      <DisplayCardCategory
        isPrototype
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardHex
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardString
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardFloat
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="0.01"
        format={{
          unit: 'ampere',
        }}
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardCategory
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        format={{
          items: [
            { name: 'k1', value: 'v1' },
            { name: 'k2', value: 'v2' },
          ],
        }}
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardGPIO
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={0}
        updatedAt={1487505857839}
        description="123123"
      />
      <ControlCardPWM
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={1}
        period="100"
        updatedAt={1487505857839}
        description="123123"
        format={{
          lowerbound: 1,
          upperbound: 100,
        }}
      />
      <ControlCardInteger
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={1000}
        format={{
          unit: 'ampere',
        }}
        updatedAt={1487505857839}
        description="123123"
      />
    </div>
  );
}

export default compose(
  pure,
)(DataChannelContentLayout);