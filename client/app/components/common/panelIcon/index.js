import { default as React, PropTypes } from 'react';
import { default as pure } from 'recompose/pure';
import { default as c } from 'classnames';

import { default as styles } from './panelIcon.css';

@pure
export default class PanelIcon extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  };

  render() {
    const {
      className,
      children,
      ...otherProps,
    } = this.props;

    return (
      <div {...otherProps}
        className={c(
          styles.base,
          className,
        )}
      >
        {
          children
        }
      </div>
    );
  }
}
