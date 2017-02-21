import React from 'react'
import pure from 'recompose/pure'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import styles from './graph.css'

const HoverInfo = ({ currentPointBox = {}, currentPoint = {} }) => (
  <div
    className={styles.hoverInfo}
    style={{ transform: `translate(${currentPointBox.left - 80}px,${currentPointBox.top - 80}px)`}}
  >
    <div>
      <FormattedMessage
        id="Graph.Datapoint"
        defaultMessage="資料點："
      />
      {currentPoint.value}
    </div>
    <div className={styles.time}>
      <FormattedMessage
        id="Graph.Time"
        defaultMessage="時間:"
      />
      {moment(currentPoint.time).format('YYYY-MM-DD HH:mm')}
    </div>
    <svg width={12} height={8} className={styles.triangle}>
      <polyline points="0,0 6,8 12,0" stroke="#D1D2D3" fill="#FAFAFA" />
    </svg>
  </div>
)

export default pure(HoverInfo)
