import React, { Component } from 'react'
import { CONTENT_HEIGHT } from '.'

import pure from 'recompose/pure'

class Point extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    }
  }

  componentDidUpdate() {
    let box
    if (this.point) {
      box = this.point.getBoundingClientRect()
      this.props.setCurrentPointBox(box)
    }
  }

  onMouseEnter = () => {
    this.setState({ isHover: true })
    this.props.setCurrentPoint({
      value: this.props.value,
      time: this.props.time,
    })
  }
  onMouseLeave = () => {
    this.setState({ isHover: false })
    this.props.setCurrentPoint(false)
  }

  render() {
    const {
      cx,
      cy,
      deltaX,
      firstPoint,
    } = this.props

    return (
      <g>
        {
          this.state.isHover && <g>
            <circle cx={cx} cy={cy} r="6" fill="rgba(0,161,222,0.5)" />
            <circle
              cx={cx}
              cy={cy}
              r="3"
              stroke="#FFFFFF"
              fill="#00A1DE"
              ref={c => { this.point = c }}
            />
            <line
              x1={cx}
              x2={cx}
              y1={0}
              y2={CONTENT_HEIGHT}
              stroke="#F39A1E"
              strokeDasharray="4, 2"
            />
          </g>
        }
        <rect
          width={firstPoint ? deltaX / 2 : deltaX}
          height={CONTENT_HEIGHT}
          x={firstPoint ? cx : cx - (deltaX / 2)}
          y="0"
          fill="rgba(0,0,0,0)"
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
        />
      </g>
    )
  }
}

export default pure(Point)
