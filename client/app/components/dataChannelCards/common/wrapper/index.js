import React from 'react';
import { compose, pure, withState } from 'recompose';

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
  value,
  ...props
}) => (
  <div>
    {displayName === 'Integer_Display' && <DisplayCardInteger value={value.value} {...props} />}
    {displayName === 'Hex_Display' && <DisplayCardHex value={value.value} {...props} />}
    {displayName === 'PWM_Display' && <DisplayCardPWM value={value.value} period={value.period} {...props} />}
    {displayName === 'String_Display' && <DisplayCardString value={value.value} {...props} />}
    {displayName === 'GPIO_Display' && <DisplayCardGPIO value={value.value} {...props} />}
    {displayName === 'Switch_Display' && <DisplayCardSwitch value={value.value} {...props} />}
    {displayName === 'Float_Display' && <DisplayCardFloat value={value.value} {...props} />}
    {displayName === 'Category_Display' && <DisplayCardCategory value={value.value} {...props} />}
    {displayName === 'Integer_Control' && <ControlCardInteger value={value.value} {...props} />}
    {displayName === 'Hex_Control' && <ControlCardHex value={value.value} {...props} />}
    {displayName === 'PWM_Control' && <ControlCardPWM value={value.value} period={value.period} {...props} />}
    {displayName === 'String_Control' && <ControlCardString value={value.value} {...props} />}
    {displayName === 'GPIO_Control' && <ControlCardGPIO value={value.value} {...props} />}
    {displayName === 'Switch_Control' && <ControlCardSwitch value={value.value} {...props} />}
    {displayName === 'Float_Control' && <ControlCardFloat value={value.value} {...props} />}
    {displayName === 'Category_Control' && <ControlCardCategory value={value.value} {...props} />}
  </div>
);

export default compose(
  pure,
  withState('value', 'setValue', (props) => {
    if (!props.value) {
      return { value: null };
    }
    return props.value;
  }),
)(WrapperLayout);
