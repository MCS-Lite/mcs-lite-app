import React from 'react';
import { PADDING_LEFT, PADDING_RIGHT } from '.';
import pure from 'recompose/pure';

import Point from './Point';

const Points = ({ data, scaleY, setCurrentPointBox, setCurrentPoint, width }) => {
  const contentWidth = width - (PADDING_LEFT + PADDING_RIGHT);
  const dataLength = data.length;
  const deltaX = dataLength > 1
  ? contentWidth / (dataLength - 1)
  : contentWidth;

  const formatedData = dataLength > 1
  ? data.map((d, index) => ({
    cx: index * deltaX + PADDING_LEFT,
    cy: scaleY(d.value),
    value: d.value,
    time: d.updatedAt,
  }))
  : [{
    cx: contentWidth / 2 + PADDING_LEFT,
    cy: scaleY(data[0].value),
    value: data[0].value,
    time: data[0].updatedAt,
  }];

  return (
    <g>
      {
        formatedData.map((d, index) => (
          <Point
            {...d}
            deltaX={deltaX}
            firstPoint={index === 0 && dataLength > 1}
            setCurrentPointBox={setCurrentPointBox}
            setCurrentPoint={setCurrentPoint}
            key={`point-${index}`}
          />
        ))
      }
    </g>
  );
}

export default pure(Points);
