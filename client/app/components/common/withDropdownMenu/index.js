import React, { Component } from 'react';
import c from 'classnames';
import { compose, pure, withState, defaultProps } from 'recompose';
import Menu from 'mtk-ui/lib/Menu';

import styles from './styles.css';

class WithDropdownMenu extends Component {
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClick, false);
  }

  onSelectChange = (e, value) => {
    this.props.onChange(value);
    this.closeMenu();
  }

  openMenu = () => {
    this.props.setIsMenuShow(true);
    this.props.onMenuShowChange(true);
    document.addEventListener('click', this.handleClick, false);
  }

  closeMenu = () => {
    this.props.setIsMenuShow(false);
    this.props.onMenuShowChange(false);
    document.removeEventListener('click', this.handleClick, false);
  }

  handleClick = (e) => {
    e.preventDefault();
    if (e.currentTarget === this.target) {
      this.openMenu();
    } else {
      this.closeMenu();
    }
  }

  render() {
    const {
      isMenuShow,
      children,
      dropdownItems,
      menuClassName,
    } = this.props;

    return (
      <div className={styles.base}>
        <div
          onClick={this.handleClick}
          ref={(component) => { this.target = component; }}
        >
          {children}
        </div>
        {
          isMenuShow &&
          <Menu
            className={c(styles.menu, menuClassName)}
            onChange={this.onSelectChange}
            items={dropdownItems}
          />
        }
      </div>
    );
  }
}

export default compose(
  pure,
  defaultProps({
    onMenuShowChange: () => {},
  }),
  withState('isMenuShow', 'setIsMenuShow', false),
)(WithDropdownMenu);
