import React from 'react';
import pure from 'recompose/pure';

import Text from '../../displayTypes/text';
import UnitType from '../../displayTypes/unitType';

import styles from './styles.css';

const FormatWrapper = ({
  displayType = 'text',
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
  ...props
}) => (
  <div className={styles[`${displayType}Wrap`]}>
    { displayType === 'text' && <Text {...props} /> }
    {
      displayType === 'unitType' &&
      <UnitType
        retrieveUnitTypes={retrieveUnitTypes}
        createUnitTypes={createUnitTypes}
        unitTypes={unitTypes}
        {...props}
      />
    }
  </div>
);

export default pure(FormatWrapper);
