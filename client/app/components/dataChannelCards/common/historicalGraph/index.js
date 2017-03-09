import React from 'react';
import { pathOr, contains } from 'ramda';
import moment from 'moment';
import { compose, pure, lifecycle, withProps } from 'recompose';
import { DataPointAreaChart } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import styles from './styles.css';

const HistoricalGraph = ({ data, XAxisProps, tooltipProps, type }) => (
  <div className={styles.base}>
    <DataPointAreaChart
      data={data}
      XAxisProps={XAxisProps}
      tooltipProps={tooltipProps}
      type={type}
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
      value: Number(pathOr(null, ['values', 'value'], datapoint)),
      updatedAt: pathOr(null, ['updatedAt'], datapoint),
    })),
    XAxisProps: {
      tickFormatter: value => moment(value).format('MM/DD hh:mm'),
    },
    tooltipProps: {
      formatter: value => `${t('datapoint')} ${value}`,
      labelFormatter: value => `${t('time')} ${moment(value).format('YYYY-MM-DD hh:mm')}`,
    },
    type: contains(
      displayName,
      ['Switch_Display', 'Switch_Control', 'GPIO_Display', 'GPIO_Control'],
    ) ? 'step' : 'linear',
  })),
)(HistoricalGraph);
