import {
  default as React,
  Component,
  PropTypes,
} from "react";

/**
 * Serve as some entry that you'd like to build together with reacthtmlpack.
 * Probably Parse Cloud Code?
 */
export default class WebpackNullEntry extends Component {
  static propTypes = {
    chunkName: PropTypes.string.isRequired,
    chunkFilepath: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    configFilepath: PropTypes.string.isRequired,
  }

  render () {
    return (
      <noscript />
    );
  }
}
