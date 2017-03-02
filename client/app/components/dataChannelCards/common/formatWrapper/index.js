import React from 'react';
import { compose, pure } from 'recompose';

import Text from '../../displayTypes/text';
import UnitType from '../../displayTypes/unitType';

const FormatWrapper = ({
  displayType,
  ...props
}) => (
  <div style={{ width: '50%' }}>
    {displayType === 'text' && <Text {...props} />}
    {displayType === 'unitType' && <UnitType {...props} />}
  </div>
);

export default compose(
  pure,
)(FormatWrapper);
