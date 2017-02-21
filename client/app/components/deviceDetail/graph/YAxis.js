import React from 'react'
import pure from 'recompose/pure'
import { PADDING_LEFT, CONTENT_HEIGHT, GRAPH_WIDTH } from '.'

const YAxis = ({ max = 128, min = 0, scaleY }) => {
  const deltaY = Math.floor((max - min) / 4.5)
  const positionYs = [1, 2, 3, 4].map(v => (v * deltaY))

  return (
    <g>
      <line
        x1={PADDING_LEFT}
        x2={PADDING_LEFT}
        y1="0"
        y2={CONTENT_HEIGHT}
        stroke="#D1D2D3"
        strokeWidth={1}
      />
      {
        positionYs.map((y, index) =>
          <text
            x={PADDING_LEFT}
            y={scaleY(y)}
            textAnchor="end"
            transform="translate(-4,4)"
            fill="#999A94"
            fontSize="12"
            key={`yLabel-${index}`}
          >
            {y}
          </text>
        )
      }
      {
        positionYs.map((y, index) =>
          <line
            x1={PADDING_LEFT}
            x2={GRAPH_WIDTH}
            y1={scaleY(y)}
            y2={scaleY(y)}
            stroke="#D1D2D3"
            strokeDasharray="4, 2"
            key={`yLine-${index}`}
          />
        )
      }
    </g>
  )
}

export default pure(YAxis)
