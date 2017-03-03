import React from 'react';
import c from 'classnames';
import { withGetMessages } from 'react-intl-inject-hoc';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import lifecycle from 'recompose/lifecycle';

import UnitSelect from '../../../common/unitSelect';
import messages from './messages';

import styles from './styles.css';

const UnitType = ({
  required,
  onFormatChange,
  getMessages: t,
  value,
  createUnitTypes,
  unitTypes,
  error,
}) => (
  <div className={styles.base}>
    <div className={styles.inputSelectWrap}>
      <div className={c(required && styles.requiredLabel)}>
        {t('unitType')}
      </div>
      <UnitSelect
        data={unitTypes}
        value={value}
        onFormatChange={onFormatChange}
        createUnitTypes={createUnitTypes}
        error={error}
      />
    </div>
    {
      error &&
      <div className={styles.errorMessage}>
        {t('unitTypeError')}
      </div>
    }
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'UnitType'),
  lifecycle({
    componentWillMount() {
      this.props.retrieveUnitTypes();
    },
  }),
)(UnitType);
