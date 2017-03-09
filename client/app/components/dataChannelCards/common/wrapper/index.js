import React from 'react';
import moment from 'moment';
import c from 'classnames';
import R from 'ramda';
import { compose, pure, withState, withHandlers } from 'recompose';
import { DataChannelCard } from 'mcs-lite-ui';
import More from '../more';
import HistoricalGraph from '../historicalGraph';
import DisplayCardInteger from '../../mcsDisplayCardInteger';
import DisplayCardString from '../../mcsDisplayCardString';
import DisplayCardHex from '../../mcsDisplayCardHex';
import DisplayCardPWM from '../../mcsDisplayCardPWM';
import DisplayCardGPIO from '../../mcsDisplayCardGPIO';
import DisplayCardSwitch from '../../mcsDisplayCardSwitch';
import DisplayCardFloat from '../../mcsDisplayCardFloat';
import DisplayCardCategory from '../../mcsDisplayCardCategory';

import ControlCardCategory from '../../mcsControlCardCategory';
import ControlCardString from '../../mcsControlCardString';
import ControlCardFloat from '../../mcsControlCardFloat';
import ControlCardHex from '../../mcsControlCardHex';
import ControlCardPWM from '../../mcsControlCardPWM';
import ControlCardGPIO from '../../mcsControlCardGPIO';
import ControlCardSwitch from '../../mcsControlCardSwitch';
import ControlCardInteger from '../../mcsControlCardInteger';

import styles from './styles.css';

const WrapperLayout = ({
  displayName,
  value: {
    value,
    period,
  } = {},
  title,
  updatedAt = '',
  description,
  isPrototype,
  isDevice,
  deviceId,
  deviceKey,
  prototypeId,
  deleteDataChannel,
  pushToast,
  isHistoryShow,
  onShowHistoryClick,
  retrieveDatachannelDatapoint,
  datapoints,
  ...props
}) => (
  <DataChannelCard
    className={c(
      styles.dataChannelCard,
      isHistoryShow && styles.withGraph,
    )}
    title={title}
    subtitle={`Last data point time : ${moment(updatedAt).format('YYYY-MM-DD h:mm')}`}
    description={description}
    header={
      <More
        isPrototype={isPrototype}
        isDevice={isDevice}
        dataChannelId={props.id}
        prototypeId={prototypeId}
        deleteDataChannel={deleteDataChannel}
        pushToast={pushToast}
        onShowHistoryClick={onShowHistoryClick}
        isHistoryShow={isHistoryShow}
      />
    }
  >
    <div className={styles.displayWrap}>
      {displayName === 'Integer_Display' && <DisplayCardInteger value={value} {...props} />}
      {displayName === 'Hex_Display' && <DisplayCardHex value={value} {...props} />}
      {displayName === 'PWM_Display' && <DisplayCardPWM value={value} period={period} {...props} />}
      {displayName === 'String_Display' && <DisplayCardString value={value} {...props} />}
      {displayName === 'GPIO_Display' && <DisplayCardGPIO value={value} {...props} />}
      {displayName === 'Switch_Display' && <DisplayCardSwitch value={value} {...props} />}
      {displayName === 'Float_Display' && <DisplayCardFloat value={value} {...props} />}
      {displayName === 'Category_Display' && <DisplayCardCategory value={value} {...props} />}
      {displayName === 'Integer_Control' && <ControlCardInteger value={value} {...props} />}
      {displayName === 'Hex_Control' && <ControlCardHex value={value} {...props} />}
      {displayName === 'PWM_Control' && <ControlCardPWM value={value} period={period} {...props} />}
      {displayName === 'String_Control' && <ControlCardString value={value} {...props} />}
      {displayName === 'GPIO_Control' && <ControlCardGPIO value={value} {...props} />}
      {displayName === 'Switch_Control' && <ControlCardSwitch value={value} {...props} />}
      {displayName === 'Float_Control' && <ControlCardFloat value={value} {...props} />}
      {displayName === 'Category_Control' && <ControlCardCategory value={value} {...props} />}
    </div>
    {
      isHistoryShow &&
      <HistoricalGraph
        dataChannelId={props.id}
        deviceId={deviceId}
        deviceKey={deviceKey}
        retrieveDatachannelDatapoint={retrieveDatachannelDatapoint}
        datapoints={datapoints}
        displayName={displayName}
      />
    }
  </DataChannelCard>
);

export default compose(
  pure,
  withState('isHistoryShow', 'setIsHistoryShow', false),
  withState('commingDatapoints', 'setCommingDatapoints', []),
  withHandlers({
    onShowHistoryClick: props => () => {
      props.setIsHistoryShow(!props.isHistoryShow);
      props.setNewDatapointsSet(R.assoc(props.id, [], props.newDatapointsSet));
    },
  }),
)(WrapperLayout);
