import React from 'react'
import { PADDING_LEFT, PADDING_RIGHT, CONTENT_HEIGHT } from '.'
import { line, area } from 'd3-shape'

import pure from 'recompose/pure'

const lineGenerator = line()
  .x(d => d.x + PADDING_LEFT)
  .y(d => d.y)

const areaGenerator = area()
  .x(d => d.x + PADDING_LEFT)
  .y1(d => d.y)
  .y0(() => CONTENT_HEIGHT)

const Line = ({ data, scaleY, width }) => {
  const contentWidth = width - (PADDING_LEFT + PADDING_RIGHT)
  const dataLength = data.length
  const deltaX = dataLength > 1
  ? contentWidth / (dataLength - 1)
  : contentWidth

  const formatedValues = dataLength > 1
  ? data.map((d, index) => ({
    x: index * deltaX, y: scaleY(d.value),
  }))
  : [
    { x: 0, y: scaleY(data[0].value)},
    { x: contentWidth, y: scaleY(data[0].value) }
  ]

  return (
    <g>
      <defs>
        <linearGradient id="areaGradient" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor="#00A1DE" stopOpacity="0.5" />
          <stop offset="1" stopColor="#88D2EE" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <path
        d={lineGenerator(formatedValues)}
        fill="none"
        stroke="#00A1DE"
      />
      <path
        d={areaGenerator(formatedValues)}
        strokeWidth="0"
        fill="url(#areaGradient)"
      />
    </g>
  )
}

export default pure(Line)
