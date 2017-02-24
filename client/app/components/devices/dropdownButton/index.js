import React from 'react'
import c from 'classnames'
import { FormattedMessage } from 'react-intl'

import compose from 'recompose/compose'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'

import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert'
import Menu from 'mtk-ui/lib/Menu';

import styles from './styles.css'

const items = [
  {
    value: 'edit',
    children: <FormattedMessage
      id="Devices.Edit"
      defaultMessage="編輯"
    />,
  },
  {
    value: 'delete',
    children: <FormattedMessage
      id="Devices.Delete"
      defaultMessage="刪除"
    />,
  },
];

const DropdownButton = ({
  isMenuShow,
  onClick,
  onMenuChange,
  className,
}) => (
  <div className={c(className, styles.base)} onClick={onClick}>
    <IconMoreVert size={24} />
    {
      isMenuShow &&
      <Menu
        className={styles.menu}
        onChange={onMenuChange}
        items={items}
      />
    }
  </div>
)

export default compose(
  pure,
  withState('isMenuShow', 'setIsMenuShow', false),
  withHandlers({
    onClick: props => () => props.setIsMenuShow(!props.isMenuShow),
    onMenuChange: props => (e, value) => props.setSeletedMenuValue(value),
  })
)(DropdownButton)
