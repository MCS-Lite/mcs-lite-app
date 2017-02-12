import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import NavItemStyles from './navItem.css';

import c from 'classnames';

const NavItem = ({
  isHover,
  linkStyle,
  href,
  target,
  children,
  className,
  activeStyle,
  activeLinkStyle,
  ...props,
}) => {
  return (
    <li
      {...props}
      className={c(
        NavItemStyles.item,
        className,
        isHover && activeStyle,
      )}
    >
      <a
        target={target}
        href={href}
        className={c(
          NavItemStyles.link,
          linkStyle,
          isHover && activeLinkStyle,
        )}
      >
        { children }
      </a>
    </li>
  );
};


export default compose(
  pure,
  withState('href', 'setHref', (props) => props.href || '#'),
  withState('isHover', 'setIsHover', false),
  withHandlers({
    onOver: (props) => props.setIsHover(true),
    onOut: (props) => props.setIsHover(false),
  }),
)(NavItem);