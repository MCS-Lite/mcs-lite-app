import React from 'react';
import EventListener from 'fbjs/lib/EventListener';

import c from 'classnames';

import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import MiUnfold from 'mtk-icon/lib/MiUnfold';

import Nav from './nav';
import Clickable from '../clickable';

import dropButtonStyles from './dropDownButton.css';

class DropdownButton extends Clickable {
  render() {
    const {
      isOpen,
      isHover,
      handleClick,
      className: menuStyle,
      buttonStyle,
      activeStyle,
      children,
      title,
      id,
      onMouseEnter,
      onMouseLeave,
    } = this.props;

    return (
      <li
        id={id}
        className={c(
          dropButtonStyles.item,
          (isHover || isOpen) && activeStyle,
          menuStyle,
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span
          onClick={handleClick}
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
            React.Children.map(children, (child, index) =>
              React.cloneElement(child, {
                key: index,
                className: c(
                  child.props.className,
                  children.length === index + 1 ? dropButtonStyles.dropDownIconborder : {},
                ),
              }))
          }
        </Nav>
      </li>
    );
  }
}

export default compose(
  pure,
  withState('isOpen', 'setIsOpen', false),
  withState('isHover', 'setIsHover', false),
  withState('onDocumentClickListener', 'setOnDocumentClickListener', null),
  withState('onDocumentKeyupListener', 'setOnDocumentKeyupListener', null),
  withHandlers({
    onMouseEnter: props => () => props.setIsHover(true),
    onMouseLeave: props => () => props.setIsHover(false),
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
  }),
)(DropdownButton);
