import React from 'react';

import pure from 'recompose/pure';

import PreviewWrapper from '../../dataChannelCards/common/previewWrapper';
import DisplayTypeWrapper from '../../dataChannelCards/common/displayTypeWrapper';

import styles from './styles.css';

const PreviewLayout = ({
  displayName,
  format,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
  ...props
}) => (
  <div>
    <div className={styles.base}>
      <PreviewWrapper
        displayName={displayName}
        format={format}
      />
    </div>
    <div className={styles.format}>
      <DisplayTypeWrapper
        displayName={displayName}
        format={format}
        retrieveUnitTypes={retrieveUnitTypes}
        createUnitTypes={createUnitTypes}
        unitTypes={unitTypes}
        {...props}
      />
    </div>
  </div>
);

export default pure(PreviewLayout);
