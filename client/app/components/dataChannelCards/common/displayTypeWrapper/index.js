import React from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';
import lifecycle from 'recompose/lifecycle';

import CategoryControlFormat from '../../mcsControlCardCategory/format';
import FloatControlFormat from '../../mcsControlCardFloat/format';
import GPIOControlFormat from '../../mcsControlCardGPIO/format';
import HexControlFormat from '../../mcsControlCardHex/format';
import IntegerControlFormat from '../../mcsControlCardInteger/format';
import PWMControlFormat from '../../mcsControlCardPWM/format';
import StringControlFormat from '../../mcsControlCardString/format';

import CategoryDisplayFormat from '../../mcsDisplayCardCategory/format';
import FloatDisplayFormat from '../../mcsDisplayCardFloat/format';
import GPIODisplayFormat from '../../mcsDisplayCardGPIO/format';
import HexDisplayFormat from '../../mcsDisplayCardHex/format';
import IntegerDisplayFormat from '../../mcsDisplayCardInteger/format';
import PWMDisplayFormat from '../../mcsDisplayCardPWM/format';
import StringDisplayFormat from '../../mcsDisplayCardString/format';

import FormatWrapper from '../formatWrapper';
import styles from './styles.css';

const DisplayTypeWrapper = ({
  format,
  onFormatChange,
  error,
  onSetError,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
}) => (
  <div className={styles.base}>
    {
      Object.keys(format).map(k => (
        <FormatWrapper
          key={k}
          displayType={format[k].displayType}
          keyName={k}
          value={format[k].value}
          onFormatChange={onFormatChange}
          onSetError={onSetError}
          error={error[k] || false}
          retrieveUnitTypes={retrieveUnitTypes}
          createUnitTypes={createUnitTypes}
          unitTypes={unitTypes}
          {...format[k]}
        />
      ))
    }
  </div>
);

export default compose(
  pure,
  withHandlers({
    onSetError: props => (k) => {
      props.error[k] = false;
      props.setError(props.error);
    },
  }),
  lifecycle({
    componentWillReceiveProps({ displayName, setFormat }) {
      if (this.props.displayName !== displayName) {
        switch (displayName) {
          case 'Integer_Display':
            setFormat(IntegerDisplayFormat);
            break;
          case 'Hex_Display':
            setFormat(HexDisplayFormat);
            break;
          case 'PWM_Display':
            setFormat(PWMDisplayFormat);
            break;
          case 'String_Display':
            setFormat(StringDisplayFormat);
            break;
          case 'GPIO_Display':
            setFormat(GPIODisplayFormat);
            break;
          case 'Float_Display':
            setFormat(FloatDisplayFormat);
            break;
          case 'Category_Display':
            setFormat(CategoryDisplayFormat);
            break;
          case 'Integer_Control':
            setFormat(IntegerControlFormat);
            break;
          case 'Hex_Control':
            setFormat(HexControlFormat);
            break;
          case 'PWM_Control':
            setFormat(PWMControlFormat);
            break;
          case 'String_Control':
            setFormat(StringControlFormat);
            break;
          case 'GPIO_Control':
            setFormat(GPIOControlFormat);
            break;
          case 'Float_Control':
            setFormat(FloatControlFormat);
            break;
          case 'Category_Control':
            setFormat(CategoryControlFormat);
            break;
          default:
            break;
        }
      }
    },
  }),
)(DisplayTypeWrapper);
