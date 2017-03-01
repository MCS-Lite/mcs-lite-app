import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import DisplayCardInteger from '../../mcsDisplayCardInteger';
import DisplayCardString from '../../mcsDisplayCardString';
import DisplayCardHex from '../../mcsDisplayCardHex';
import DisplayCardPWM from '../../mcsDisplayCardPWM';
import DisplayCardGPIO from '../../mcsDisplayCardGPIO';
import DisplayCardSwitch from '../../mcsDisplayCardSwitch';
import DisplayCardFloat from '../../mcsDisplayCardFloat';
import DisplayCardCategory from '../../mcsDisplayCardCategory';
import ControlCardCategory from '../../mcsControlCardCategory';
import ControlCardString from '../../mcsControlCardString';
import ControlCardFloat from '../../mcsControlCardFloat';
import ControlCardHex from '../../mcsControlCardHex';
import ControlCardPWM from '../../mcsControlCardPWM';
import ControlCardGPIO from '../../mcsControlCardGPIO';
import ControlCardSwitch from '../../mcsControlCardSwitch';
import ControlCardInteger from '../../mcsControlCardInteger';

const WrapperLayout = ({
  displayName,
  ...props,
}) => {
  return (
    <div>
      {displayName === 'Integer_Display' ? <DisplayCardInteger {...props} /> : ''}
      {displayName === 'Hex_Display' ? <DisplayCardHex {...props} />: ''}
      {displayName === 'PWM_Display' ? <DisplayCardPWM {...props} />: ''}
      {displayName === 'String_Display' ? <DisplayCardString {...props} />: ''}
      {displayName === 'GPIO_Display' ? <DisplayCardGPIO {...props} />: ''}
      {displayName === 'Switch_Display' ? <DisplayCardSwitch {...props} />: ''}
      {displayName === 'Float_Display' ? <DisplayCardFloat {...props} />: ''}
      {displayName === 'Category_Display' ? <DisplayCardCategory {...props} />: ''}
      {displayName === 'Integer_Control' ? <ControlCardInteger {...props} />: ''}
      {displayName === 'Hex_Control' ? <ControlCardHex {...props} />: ''}
      {displayName === 'PWM_Control' ? <ControlCardPWM {...props} />: ''}
      {displayName === 'String_Control' ? <ControlCardString {...props} />: ''}
      {displayName === 'GPIO_Control' ? <ControlCardGPIO {...props} />: ''}
      {displayName === 'Switch_Control' ? <ControlCardSwitch {...props} />: ''}
      {displayName === 'Float_Control' ? <ControlCardFloat {...props} />: ''}
      {displayName === 'Category_Control' ? <ControlCardCategory {...props} />: ''}
    </div>
  );
}

export default compose(
  pure,
)(WrapperLayout);

