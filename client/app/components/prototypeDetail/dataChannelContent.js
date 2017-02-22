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
import DataChannelWrapper from '../dataChannelCards/common/wrapper';
const DataChannelContentLayout = ({
  prototypeId,
}) => {
  return (
    <div className={PrototypeDetailStyles.dataChannelContent}>
      <NewDisplayCard prototypeId={prototypeId} />
      <DataChannelWrapper
        displayName="Integer_Display"
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={50}
        title="Title"
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="String_Display"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value="This is string!"
        format={{
          unit: 'abc',
        }}
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="Hex_Display"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value="WQEQWEQE123i123i123sqweqweQWEQEW"
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="PWM_Display"
        isPrototype
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value={200}
        title="Title"
        period={100}
        format={{
          lowerbound: 1,
          upperbound: 100,
        }}
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="GPIO_Display"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value={0}
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="Float_Display"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value="0.0"
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="Category_Display"
        isPrototype
        title="Title"
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
      <DataChannelWrapper
        displayName="Hex_Control"
        isPrototype
        title="Title"
        id="123"
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="String_Control"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value="v2"
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="Float_Control"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value="0.01"
        format={{
          unit: 'ampere',
        }}
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="Category_Control"
        isPrototype
        id="123"
        title="Title"
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
      <DataChannelWrapper
        displayName="GPIO_Control"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value={0}
        updatedAt={1487505857839}
        description="123123"
      />
      <DataChannelWrapper
        displayName="PWM_Control"
        isPrototype
        id="123"
        title="Title"
        className={PrototypeDetailStyles.displayCard}
        value={1}
        period={100}
        updatedAt={1487505857839}
        description="123123"
        format={{
          lowerbound: 1,
          upperbound: 100,
        }}
      />
      <DataChannelWrapper
        displayName="Integer_Control"
        isPrototype
        id="123"
        title="Title"
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