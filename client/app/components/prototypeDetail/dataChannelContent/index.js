import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import DataChannelWrapper from '../../dataChannelCards/common/wrapper';
import NewDisplayCard from '../newDisplayCard';

import styles from '../styles.css';

const DataChannelContentLayout = ({
  datachannels,
  prototypeId,
  createDataChannel,
}) => {
  return (
    <div className={styles.dataChannelContent}>
      <NewDisplayCard
        createDataChannel={createDataChannel}
        prototypeId={prototypeId}
      />
      {
        typeof datachannels === 'object' ?
          datachannels.map((dataChannel, v)=>{
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
                id={dataChannel.datachannelId}
                title={dataChannel.datachannelName}
                className={styles.displayCard}
                value={{}}
                format={dataChannel.format}
                updatedAt={dataChannel.updatedAt}
                description={dataChannel.datachannelDescription}
              />
            );
          })
        :
        ''
      }
    </div>
  );
}

export default compose(
  pure,
)(DataChannelContentLayout);