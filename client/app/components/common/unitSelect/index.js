import React from 'react';
import c from 'classnames';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import withPropsOnChange from 'recompose/withPropsOnChange';

import InputSelect from 'mtk-ui/lib/InputSelect';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import NoResultsContent from './noResultsContent';

import styles from './unitSelect.css';

const filterFunc = (item, inputValue) => item.value.name.includes(inputValue);

const UnitSelect = ({
  items = [],
  value = {},
  onInputChange,
  onChange,
  onFormatChange,
  generalUnitName,
  setGeneralUnitName,
  createUnitTypes,
  error,
  getMessages: t,
}) => (
  <InputSelect
    items={items}
    value={value}
    className={c(
      styles.base,
      error && styles.inputSelectError,
    )}
    placeholder={t('inputSelectPlaceholder')}
    onInputChange={onInputChange}
    onChange={onChange}
    filterFunc={filterFunc}
    valueRenderer={() => generalUnitName}
    noResultsContent={
      <NoResultsContent
        generalUnitName={generalUnitName}
        setGeneralUnitName={setGeneralUnitName}
        createUnitTypes={createUnitTypes}
        onFormatChange={onFormatChange}
      />
    }
  />
);

export default compose(
  pure,
  withPropsOnChange(
    ['data'],
    ({ data = []}) => ({
      items: data.map(({ name: value, symbol }) => ({
        value: { name: value, symbol },
        children: <div className={styles.unitList}>
          <span className={styles.unitName}>{value}</span>
          <span className={styles.unitSymbol}>{symbol}</span>
        </div>,
      })),
    }),
  ),
  withState('generalUnitName', 'setGeneralUnitName', ''),
  withHandlers({
    onInputChange: props => (e) => {
      props.setGeneralUnitName(e.target.value);
    },
    onChange: props => (target, value = {}) => {
      props.setGeneralUnitName(value.name);
      props.onFormatChange('unit', value.name);
    },
  }),
  withGetMessages(messages, 'UnitSelect'),
)(UnitSelect);
