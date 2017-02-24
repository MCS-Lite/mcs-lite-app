import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';

import DataChannelWrapper from '../../dataChannelCards/common/wrapper';

import styles from './styles.css';

const DataChannelContentLayout = ({
  datachannels,
}) => {
  return (
    <div className={styles.dataChannelContent}>
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
                isDevice
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