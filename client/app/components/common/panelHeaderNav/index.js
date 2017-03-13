import React from 'react';
import { pure, compose, withState, withHandlers } from 'recompose';
import c from 'classnames';

import styles from './styles.css';

const PanelHeaderNavItem = ({ onClick, children, active }) => (
  <div
    onClick={onClick}
    className={c(
      styles.panelHeaderNavItem,
      active && styles.panelHeaderNavItemActive,
    )}
  >
    {children}
  </div>
);

const PanelHeaderNav = pure(({
  items = [],
  value,
  onItemClick,
}) => (
  <div className={styles.panelHeaderNav}>
    {
      items.map((item = {}) => (
        <PanelHeaderNavItem
          value={item.value}
          active={value === item.value}
          onClick={onItemClick(item.value)}
          key={`navItem-${item.value}`}
        >
          {item.children}
        </PanelHeaderNavItem>
      ))
    }
  </div>
));

export default compose(
  pure,
  withState('activeValue', 'setActiveValue', ''),
  withHandlers({
    onItemClick: props => value => () => props.onChange(value),
  }),
)(PanelHeaderNav);
