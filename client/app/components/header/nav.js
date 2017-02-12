import React, { Component } from 'react';

import navStyles from './nav.css';
import c from 'classnames';

class Nav extends Component {

  render() {
    let {
      style: listStyle,
      children,
      dropdownMenu,
      ...props,
    } = this.props;

    return (
      <ul {...props} className={c(
        dropdownMenu ? navStyles.dropdownMenu : navStyles.list,
        listStyle
      )}>
        {React.Children.map(children, this._renderChildren)}
      </ul>
    );
  }

  _renderChildren(child, index) {
    return React.cloneElement(child, {key: index});
  }
}

export default Nav;