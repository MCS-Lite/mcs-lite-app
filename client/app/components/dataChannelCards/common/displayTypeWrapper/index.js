import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import TextDisplayType from '../../displayTypes/text';
import UnitTypeDisplayType from '../../displayTypes/unitType';

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
  displayName,
  format,
  setFormat,
  onFormatChange,
  error,
  onSetError,
  ...props,
}) => {
  switch(displayName) {
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
  }
  console.log('==== format: =====');
  console.log(format);
  console.log('==================');
  return (
    <div className={styles.base}>
      {
        Object.keys(format).map((k,v) => {
          return (
            <FormatWrapper
              displayType={format[k].displayType}
              keyName={k}
              value={format[k].value}
              onFormatChange={onFormatChange}
              onSetError={onSetError}
              error={error[k] || false}
              {...format[k]}
            />
          );
        })
      }
    </div>
  );
}

export default compose(
  pure,
  withHandlers({
    onSetError: (props) => (k) => {
      props.error[k] = false;
      props.setError(props.error);
    },
  }),
)(DisplayTypeWrapper)

