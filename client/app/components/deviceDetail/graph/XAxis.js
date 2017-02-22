import React from 'react';
import moment from 'moment';
import { CONTENT_HEIGHT, PADDING_LEFT, PADDING_RIGHT } from '.';

import pure from 'recompose/pure';

const LabelText = ({ x, timeValue }) => (
  <text
    y={CONTENT_HEIGHT + 20}
    textAnchor="middle"
    fill="#999A94"
    fontSize="12"
  >
    <tspan x={x}>
      {moment(timeValue).format('MM/DD')}
    </tspan>
    <tspan x={x} dy="15">
      {moment(timeValue).format('hh:mm')}
    </tspan>
  </text>
);

const XLabels = ({ min, max, width }) => {
  const contentWidth = width - (PADDING_LEFT + PADDING_RIGHT)
  const deltaX = contentWidth / 6;
  const centerX = contentWidth / 2 + PADDING_LEFT;
  const positionXs = min === max
  ? [centerX]
  : [0, 1, 2, 3, 4, 5, 6].map(x => x * deltaX + PADDING_LEFT);

  return (
    <g>
      {
        positionXs.map((x, index) =>
          <line
            x1={x}
            x2={x}
            y1={CONTENT_HEIGHT}
            y2={CONTENT_HEIGHT + 5}
            stroke="#D1D2D3"
            key={`xLine-${index}`}
          />
        )
      }
      <LabelText
        x={positionXs[0]}
        timeValue={min}
      />
      {
        min !== max &&
        <LabelText
          x={width - PADDING_RIGHT}
          timeValue={max}
        />
      }
    </g>
  );
}

const XAxis = ({ min, max , width }) => (
  <g>
    <line
      x1={PADDING_LEFT}
      x2={width}
      y1={CONTENT_HEIGHT}
      y2={CONTENT_HEIGHT}
      stroke="#D1D2D3"
    />
    { min !== 0 && <XLabels min={min} max={max} width={width}/> }
  </g>
);

export default pure(XAxis);
