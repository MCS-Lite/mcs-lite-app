import React from 'react';
import { T } from 'ramda';
import InputForm from 'mtk-ui/lib/InputForm';
import InputSelect from 'mtk-ui/lib/InputSelect';

import styles from './styles.css';

const MethodSelector = ({
  options,
  valueRenderer,
  getMessages: t,
  value,
  onChange,
}) => (
  <InputForm
    kind="horizontal"
    style={{ backgroundColor: 'white' }}
    className={styles.form}
  >
    <InputSelect
      placeholder={t('inputPrototypeInfo')}
      items={options}
      value={value}
      label={t('chooseCreateMethod')}
      filterFunc={T}
      valueRenderer={valueRenderer}
      onChange={onChange}
      className={styles.input}
    />
  </InputForm>
);

export default MethodSelector;
