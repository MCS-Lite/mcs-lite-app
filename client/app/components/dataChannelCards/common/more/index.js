import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import Menu from 'mtk-ui/lib/Menu';

import moreStyles from './more.css';
import {FormattedMessage} from 'react-intl';

const MoreLayout = ({
  setIsOpen,
  isOpen,
  onSelectMenuValueChange,
  selectMenuValue,
  isPrototype,
  isDevice,
  onDeleteDataChannel,
}) => {
  let items = [];

  if (isPrototype) {
    items = [
      {
        value: 'edit',
        children:
          <div>
            <FormattedMessage
              id='edit'
              defaultMessage='編輯'
            />
          </div>
      },{
        value: 'delete',
        children:
          <div>
            <FormattedMessage
              id='delete'
              defaultMessage='刪除'
            />
          </div>
      },
    ];
  } else if (isDevice) {
    items = [
      {
        value: 'apiHint',
        children:
          <div onClick={()=>{onDeleteDataChannel(prototypeId, id)}}>
            <FormattedMessage
              id='apiHint'
              defaultMessage='API Hint'
            />
          </div>
      },
    ];
  }
  let iconStyle = {};
  if (!isOpen) {
    iconStyle = {
      color: '#0080B4',
      fontSize: 24,
      cursor: 'pointer',
      marginRight: -11,
      marginTop: 4,
      
    };
  } else {
    iconStyle = {
      color: '#0080B4',
      fontSize: 24,
      cursor: 'pointer',
      top: -24,
      right: -80,
      position: 'relative',
    };
  }

  return (
    <div>
      {
        (isPrototype || isDevice) ?
          <div>
            <IconMoreVert
              onClick={()=>{setIsOpen(!isOpen)}}
              style={iconStyle}
            />
            {
              isOpen ?
                <Menu
                  className={moreStyles.menu}
                  onChange={onSelectMenuValueChange}
                  selectedValue={selectMenuValue}
                  items={items}
                />
              : ''
            }
          </div>
        : ''
      }
    </div>
  );
}

export default compose(
  pure,
  withState('isOpen', 'setIsOpen', false),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withHandlers({
    onSelectMenuValueChange: (props) => () => {
      // props.setIsOpen(!props.isOpen)
    },
  }),
)(MoreLayout)
