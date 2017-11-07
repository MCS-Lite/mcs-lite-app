import React from 'react';
import { compose, pure } from 'recompose';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import NewDisplayCard from '../newDisplayCard';
import styles from './styles.css';

const DataChannelContentLayout = ({
  datachannels,
  prototypeId,
  checkDatachannelIdAvailable,
  createDataChannel,
  deleteDataChannel,
  retrieveUnitTypes,
  unitTypes,
  createUnitTypes,
  pushToast,
  readOnly,
  getMessages: t,
}) => (
  <div className={styles.dataChannelContent}>
    {
      readOnly && datachannels.length === 0 &&
      <div className={styles.noDatachannels}>{t('noDatachannels')}</div>
    }
    {
      !readOnly &&
      <NewDisplayCard
        checkDatachannelIdAvailable={checkDatachannelIdAvailable}
        createDataChannel={createDataChannel}
        prototypeId={prototypeId}
        retrieveUnitTypes={retrieveUnitTypes}
        createUnitTypes={createUnitTypes}
        unitTypes={unitTypes}
        pushToast={pushToast}
      />
    }
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
              format={dataChannel.format}
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
  withGetMessages(messages, 'PrototypeDetail'),
)(DataChannelContentLayout);
