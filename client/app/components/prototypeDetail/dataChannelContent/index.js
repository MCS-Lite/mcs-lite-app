import React from 'react';
import { compose, pure } from 'recompose';

import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import NewDisplayCard from '../newDisplayCard';
import styles from '../styles.css';

const DataChannelContentLayout = ({
  datachannels,
  prototypeId,
  createDataChannel,
  deleteDataChannel,
  retrieveUnitTypes,
  unitTypes,
  createUnitTypes,
  pushToast,
}) => (
  <div className={styles.dataChannelContent}>
    <NewDisplayCard
      createDataChannel={createDataChannel}
      prototypeId={prototypeId}
      retrieveUnitTypes={retrieveUnitTypes}
      createUnitTypes={createUnitTypes}
      unitTypes={unitTypes}
      pushToast={pushToast}
    />
    {
      typeof datachannels === 'object' &&
        datachannels.map((dataChannel) => {
          let displayName = dataChannel.channelType.name;
          if (dataChannel.type === 1) {
            displayName += '_Control';
          } else {
            displayName += '_Display';
          }
          return (
            <DataChannelWrapper
              key={dataChannel.datachannelId}
              displayName={displayName}
              isPrototype
              onSubmit={() => {}}
              id={dataChannel.datachannelId}
              title={dataChannel.datachannelName}
              className={styles.displayCard}
              value={null}
              format={dataChannel.format}
              updatedAt={dataChannel.updatedAt}
              description={dataChannel.datachannelDescription}
              deleteDataChannel={deleteDataChannel}
              prototypeId={prototypeId}
              pushToast={pushToast}
            />
          );
        })
    }
  </div>
);

export default compose(
  pure,
)(DataChannelContentLayout);
