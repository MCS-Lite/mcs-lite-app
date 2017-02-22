import React, { PropTypes } from 'react';
import withSize from 'react-dom-utils/lib/withSize';
import throttle from 'raf-throttle';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import setPropTypes from 'recompose/setPropTypes';

import YAxis from './YAxis';
import XAxis from './XAxis';
import Line from './Line';
import Points from './Points';
import HoverInfo from './HoverInfo';

import styles from './graph.css';

export const GRAPH_HEIGHT = 216
export const PADDING_LEFT = 25
export const PADDING_BOTTOM = 38
export const PADDING_RIGHT = 17
export const CONTENT_HEIGHT = GRAPH_HEIGHT - PADDING_BOTTOM

const Graph = ({
  data = [],
  max = 128,
  min = 0,
  currentPointBox,
  setCurrentPointBox,
  currentPoint,
  setCurrentPoint,
  DOMSize: {
    offsetWidth: width = 556,
  } = {},
}) => {
  if (max === min) {
    console.error('max can not equals to min');
  }

  const scaleY = y => CONTENT_HEIGHT - (CONTENT_HEIGHT / (max - min) * y);

  const xMin = data.length > 0 ? data[0].updatedAt : 0;
  const xMax = data.length > 0 ? data[data.length - 1].updatedAt : 0;

  return (
    <div className={styles.base}>
      {
        currentPoint &&
        <HoverInfo
          currentPointBox={currentPointBox}
          currentPoint={currentPoint}
        />
      }
      <svg width={width} height={GRAPH_HEIGHT} viewBox={`0 0 ${width} ${GRAPH_HEIGHT}`}>
        <YAxis max={max} min={min} scaleY={scaleY} width={width} />
        <XAxis max={xMax} min={xMin} width={width} />
        {
          data.length > 0 && <g>
            <Line scaleY={scaleY} data={data} width={width} />
            <Points
              scaleY={scaleY}
              data={data}
              setCurrentPointBox={setCurrentPointBox}
              setCurrentPoint={setCurrentPoint}
              width={width}
            />
          </g>
        }
      </svg>
    </div>
  );
}

export default compose(
  pure,
  withSize(throttle),
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
)(Graph);
