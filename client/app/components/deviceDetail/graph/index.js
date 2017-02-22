import React, { PropTypes } from 'react'

import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import setPropTypes from 'recompose/setPropTypes'

import YAxis from './YAxis'
import XAxis from './XAxis'
import Line from './Line'
import Points from './Points'
import HoverInfo from './HoverInfo'

import styles from './graph.css'

export const GRAPH_WIDTH = 556
export const GRAPH_HEIGHT = 216
export const PADDING_LEFT = 25
export const PADDING_BOTTOM = 38
export const PADDING_RIGHT = 17
export const CONTENT_WIDTH = GRAPH_WIDTH - (PADDING_LEFT + PADDING_RIGHT)
export const CONTENT_HEIGHT = GRAPH_HEIGHT - PADDING_BOTTOM

const Graph = ({
  data = [],
  max = 128,
  min = 0,
  currentPointBox,
  setCurrentPointBox,
  currentPoint,
  setCurrentPoint,
}) => {
  if (max === min) {
    console.error('max can not equals to min');
  }

  const scaleY = y => CONTENT_HEIGHT - (CONTENT_HEIGHT / (max - min) * y)

  const xMin = data.length > 0 ? data[0].updatedAt : 0
  const xMax = data.length > 0 ? data[data.length - 1].updatedAt : 0

  return (
    <div className={styles.base}>
      {
        currentPoint &&
        <HoverInfo
          currentPointBox={currentPointBox}
          currentPoint={currentPoint}
        />
      }
      <svg width={GRAPH_WIDTH} height={GRAPH_HEIGHT}>
        <YAxis max={max} min={min} scaleY={scaleY} />
        <XAxis max={xMax} min={xMin}/>
        {
          data.length > 0 && <g>
            <Line scaleY={scaleY} data={data} />
            <Points
              scaleY={scaleY}
              data={data}
              setCurrentPointBox={setCurrentPointBox}
              setCurrentPoint={setCurrentPoint}
            />
          </g>
        }
      </svg>
    </div>
  )
}

export default compose(
  pure,
  withState('currentPointBox', 'setCurrentPointBox', {}),
  withState('currentPoint', 'setCurrentPoint', false),
  setPropTypes({
    data: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
      updatedAt: PropTypes.number,
    })),
    min: PropTypes.number,
    max: PropTypes.number,
  }),
)(Graph)
