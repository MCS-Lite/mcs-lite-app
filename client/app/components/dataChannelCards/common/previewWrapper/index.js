import React from 'react';
import { compose, pure } from 'recompose';
import R from 'ramda';

import CategoryControlPreview from '../../mcsControlCardCategory/preview';
import IntegerControlPreview from '../../mcsControlCardInteger/preview';
import StringControlPreview from '../../mcsControlCardString/preview';
import FloatControlPreview from '../../mcsControlCardFloat/preview';
import HexControlPreview from '../../mcsControlCardHex/preview';
import GPIOControlPreview from '../../mcsControlCardGPIO/preview';
import PWMControlPreview from '../../mcsControlCardPWM/preview';
import SwitchControlPreview from '../../mcsControlCardSwitch/preview';

import CategoryDisplayPreview from '../../mcsDisplayCardCategory/preview';
import IntegerDisplayPreview from '../../mcsDisplayCardInteger/preview';
import StringDisplayPreview from '../../mcsDisplayCardString/preview';
import FloatDisplayPreview from '../../mcsDisplayCardFloat/preview';
import HexDisplayPreview from '../../mcsDisplayCardHex/preview';
import GPIODisplayPreview from '../../mcsDisplayCardGPIO/preview';
import PWMDisplayPreview from '../../mcsDisplayCardPWM/preview';
import SwitchDisplayPreview from '../../mcsDisplayCardSwitch/preview';

const WrapperLayout = ({
  displayName,
  ...props
}) => R.cond([
  [R.equals('Integer_Display'), R.always(<IntegerDisplayPreview {...props} />)],
  [R.equals('Hex_Display'), R.always(<HexDisplayPreview {...props} />)],
  [R.equals('PWM_Display'), R.always(<PWMDisplayPreview {...props} />)],
  [R.equals('String_Display'), R.always(<StringDisplayPreview {...props} />)],
  [R.equals('GPIO_Display'), R.always(<GPIODisplayPreview {...props} />)],
  [R.equals('Switch_Display'), R.always(<SwitchDisplayPreview {...props} />)],
  [R.equals('Float_Display'), R.always(<FloatDisplayPreview {...props} />)],
  [R.equals('Category_Display'), R.always(<CategoryDisplayPreview {...props} />)],
  [R.equals('Integer_Control'), R.always(<IntegerControlPreview {...props} />)],
  [R.equals('Hex_Control'), R.always(<HexControlPreview {...props} />)],
  [R.equals('PWM_Control'), R.always(<PWMControlPreview {...props} />)],
  [R.equals('String_Control'), R.always(<StringControlPreview {...props} />)],
  [R.equals('GPIO_Control'), R.always(<GPIOControlPreview {...props} />)],
  [R.equals('Switch_Control'), R.always(<SwitchControlPreview {...props} />)],
  [R.equals('Float_Control'), R.always(<FloatControlPreview {...props} />)],
  [R.equals('Category_Control'), R.always(<CategoryControlPreview {...props} />)],
  [R.T, R.always(<div />)],
])(displayName);

export default compose(
  pure,
)(WrapperLayout);
