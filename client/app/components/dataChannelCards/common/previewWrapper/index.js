import React from 'react';
import { compose, pure } from 'recompose';

import styles from './styles.css';
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
}) => (
  <div className={styles.base}>
    {displayName === 'Integer_Display' && <IntegerDisplayPreview {...props} />}
    {displayName === 'Hex_Display' && <HexDisplayPreview {...props} />}
    {displayName === 'PWM_Display' && <PWMDisplayPreview {...props} />}
    {displayName === 'String_Display' && <StringDisplayPreview {...props} />}
    {displayName === 'GPIO_Display' && <GPIODisplayPreview {...props} />}
    {displayName === 'Switch_Display' && <SwitchDisplayPreview {...props} />}
    {displayName === 'Float_Display' && <FloatDisplayPreview {...props} />}
    {displayName === 'Category_Display' && <CategoryDisplayPreview {...props} />}
    {displayName === 'Integer_Control' && <IntegerControlPreview {...props} />}
    {displayName === 'Hex_Control' && <HexControlPreview {...props} />}
    {displayName === 'PWM_Control' && <PWMControlPreview {...props} />}
    {displayName === 'String_Control' && <StringControlPreview {...props} />}
    {displayName === 'GPIO_Control' && <GPIOControlPreview {...props} />}
    {displayName === 'Switch_Control' && <SwitchControlPreview {...props} />}
    {displayName === 'Float_Control' && <FloatControlPreview {...props} />}
    {displayName === 'Category_Control' && <CategoryControlPreview {...props} />}
  </div>
);

export default compose(
  pure,
)(WrapperLayout);

