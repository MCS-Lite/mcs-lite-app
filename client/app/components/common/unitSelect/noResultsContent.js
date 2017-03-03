import React from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import styles from './unitSelect.css';

const wrapperProps = { className: styles.noResultsContentInputWrapper };

const NoResultsContent = ({
  error,
  onCancelNewUnitValue,
  onSubmitNewUnit,
  generalUnitName,
  generalUnitSymbol,
  onUnitNameChange,
  onUnitSymbolChange,
  getMessages: t,
}) => (
  <div className={styles.noResultsContent}>
    <div className={styles.noResultsHint}>
      {t('noResultsFound')}
    </div>
    <div className={styles.column}>
      <div>
        {t('unitName')}
        <span className={styles.hint}>*</span>
      </div>
      <InputText
        className={styles.noResultsContentInput}
        wrapperProps={wrapperProps}
        value={generalUnitName}
        onChange={onUnitNameChange}
        error={error}
        placeholder={t('unitNamePlaceholder')}
      />
    </div>
    <div className={styles.column}>
      <div>
        {t('unitSymbol')}
      </div>
      <InputText
        className={styles.noResultsContentInput}
        wrapperProps={wrapperProps}
        onChange={onUnitSymbolChange}
        value={generalUnitSymbol}
        placeholder={t('unitSymbolPlaceholder')}
      />
    </div>
    <div className={styles.buttonWrap}>
      <Button
        kind="cancel"
        onClick={onCancelNewUnitValue}
      >
        {t('cancel')}
      </Button>
      <Button
        className={styles.save}
        onClick={onSubmitNewUnit}
      >
        {t('save')}
      </Button>
    </div>
  </div>
);

export default compose(
  pure,
  withState('generalUnitSymbol', 'setGeneralUnitSymbol', ''),
  withState('error', 'setError', false),
  withHandlers({
    onUnitNameChange: props => e => props.setGeneralUnitName(e.target.value),
    onUnitSymbolChange: props => e => props.setGeneralUnitSymbol(e.target.value),
    onCancelNewUnitValue: props => () => {
      props.setGeneralUnitName('');
      props.setGeneralUnitSymbol('');
    },
    onSubmitNewUnit: props => () => {
      const newUnitType = {
        name: props.generalUnitName,
        symbol: props.generalUnitSymbol,
      };
      if (props.generalUnitName.length === 0) {
        props.setError(true);
      } else {
        props.createUnitTypes(newUnitType);
        props.setGeneralUnitName(props.generalUnitName);
        props.setGeneralUnitSymbol('');
        props.onFormatChange('unit', newUnitType);
      }
    },
  }),
  withGetMessages(messages, 'UnitSelect'),
)(NoResultsContent);
