import React from 'react';
import R from 'ramda';
import moment from 'moment';
import { compose, pure, lifecycle, withProps, withHandlers } from 'recompose';
import { DataPointAreaChart } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';
import DateSelector from './dateSelector';

import styles from './styles.css';

const HistoricalGraph = ({
  data,
  XAxisProps,
  tooltipProps,
  type,
  startDate,
  endDate,
  onDateSelectorSearch,
  getMessages: t,
}) => (
  <div className={styles.base}>
    {
      data.length > 0
      ? <DataPointAreaChart
        data={data}
        XAxisProps={XAxisProps}
        tooltipProps={tooltipProps}
        type={type}
      />
      : <div className={styles.noData}>{t('noData')}</div>
    }
    <DateSelector
      startDate={startDate}
      endDate={endDate}
      onSearch={onDateSelectorSearch}
    />
  </div>
);

export default compose(
  pure,
  lifecycle({
    componentWillMount() {
      const {
        deviceId,
        deviceKey,
        dataChannelId,
      } = this.props;
      this.props.retrieveDatachannelDatapoint(deviceId, deviceKey, dataChannelId);
    },
  }),
  withGetMessages(messages, 'HistoricalGraph'),
  withProps(({ datapoints = [], getMessages: t, displayName }) => ({
    data: datapoints.map(datapoint => ({
      value: Number(R.pathOr(null, ['values', 'value'], datapoint)),
      updatedAt: R.pathOr(null, ['updatedAt'], datapoint),
    })),
    XAxisProps: {
      tickFormatter: value => moment(value).format('MM/DD HH:mm'),
      padding: { right: 20 },
    },
    tooltipProps: {
      formatter: value => `${t('datapoint')} ${value}`,
      labelFormatter: value => `${t('time')} ${moment(value).format('YYYY-MM-DD HH:mm')}`,
    },
    type: R.contains(
      displayName,
      ['Switch_Display', 'Switch_Control', 'GPIO_Display', 'GPIO_Control'],
    ) ? 'step' : 'linear',
    startDate: R.pipe(R.head, R.propOr(new Date(), 'updatedAt'), u => new Date(u))(datapoints),
    endDate: R.pipe(R.last, R.propOr(new Date(), 'updatedAt'), u => new Date(u))(datapoints),
  })),
  withHandlers({
    onDateSelectorSearch: props => (startDate, endDate) => {
      const { deviceId, deviceKey, dataChannelId } = props;
      const start = startDate || props.startDate.getTime();
      const end = endDate || props.endDate.getTime();

      if (startDate || endDate) {
        props.retrieveDatachannelDatapoint(deviceId, deviceKey, dataChannelId, start, end);
      } else {
        props.retrieveDatachannelDatapoint(deviceId, deviceKey, dataChannelId);
      }

      props.setNewDatapointsSet([]);
    },
  }),
)(HistoricalGraph);
