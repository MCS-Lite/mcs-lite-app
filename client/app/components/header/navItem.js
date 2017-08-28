import React from 'react';
import { Link } from 'react-router';
import c from 'classnames';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import NavItemStyles from './navItem.css';

const NavItem = ({
  isHover,
  linkStyle,
  to,
  target,
  children,
  className,
  activeStyle,
  activeLinkStyle,
  onMouseEnter,
  onMouseLeave,
  isHref,
  href,
  setIsHover,
  ...props
}) => (
  <li
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    className={c(
      NavItemStyles.item,
      className,
      isHover && activeStyle,
    )}
  >
    {
      isHref ?
        <a
          href={to}
          className={c(
            NavItemStyles.link,
            linkStyle,
            isHover && activeLinkStyle,
          )}
          target="_blank"
        >
          { children }
        </a> 
      :
        <Link
          target={target}
          to={to}
          href={href}
          className={c(
            NavItemStyles.link,
            linkStyle,
            isHover && activeLinkStyle,
          )}
          activeClassName={activeLinkStyle}
          {...props}
        >
          { children }
        </Link>
    }

  </li>
);

export default compose(
  pure,
  withState('isHover', 'setIsHover', false),
  withHandlers({
    onMouseEnter: props => () => props.setIsHover(true),
    onMouseLeave: props => () => props.setIsHover(false),
  }),
)(NavItem);
