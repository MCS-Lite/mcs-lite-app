import React, { Component } from 'react';
import EventListener from 'fbjs/lib/EventListener';

import c from 'classnames';
import Nav from './Nav';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import dropButtonStyles from './dropDownButton.css';

import Clickable from '../clickable'
import MiUnfold from 'mtk-icon/lib/MiUnfold';
import MiFold from 'mtk-icon/lib/MiFold';

@pure
@withState('isOpen', 'setIsOpen', false)
@withState('isHover', 'setIsHover', false)
@withState('onDocumentClickListener', 'setOnDocumentClickListener', null)
@withState('onDocumentKeyupListener', 'setOnDocumentKeyupListener', null)
@withHandlers({
  handleClick: props => (e) => {
    const hide = () => {
      props.setIsOpen(false);
      if (props.onDocumentClickListener) {
        props.onDocumentClickListener.remove();
      }

      if (props.onDocumentKeyupListener) {
        props.onDocumentKeyupListener.remove();
      }
    };

    e.preventDefault();
    if (props.isOpen) {
      return hide();
    }

    if (props.onDocumentClickListener) {
      props.onDocumentClickListener.remove();
    }

    props.setIsOpen(true);

    props.setOnDocumentClickListener(EventListener.listen(document, 'click', hide));
    props.setOnDocumentKeyupListener(EventListener.listen(document, 'keyup', hide));

  },
})
export default class DropdownButton extends Clickable {

  render() {
    const {
      isOpen,
      isHover,
      handleClick,
      className: menuStyle,
      buttonStyle,
      activeStyle,
      arrowIcon,
      children,
      title,
      id,
    } = this.props;

    return (
      <li
        id={id}
        className={c(
          dropButtonStyles.item,
          (isHover || isOpen) && activeStyle,
          menuStyle
        )}
      >
        <span onClick={handleClick}
          ref="title"
          className={c(
            buttonStyle,
            (isHover || isOpen) && activeStyle,
          )}
        >
          { title }
          <MiUnfold
            className={c(
              dropButtonStyles.dropDownIcon,
              isOpen ? dropButtonStyles.dropDownIconOpen : dropButtonStyles.dropDownIconClose,
            )}
          />
        </span>
        <Nav
          dropdownMenu
          className={c(
            dropButtonStyles.desktopNav,
            isOpen ? dropButtonStyles.desktopNavShow : dropButtonStyles.desktopNavHide,
          )}
        >
          {

            React.Children.map(children, (child, index) => {
              return React.cloneElement(child, {
                key: index,
                className: c(
                  child.props.className,
                  children.length === index + 1 ? dropButtonStyles.dropDownIconborder : {},
                ),
              });
            })
          }
        </Nav>
      </li>
    );
  }
};