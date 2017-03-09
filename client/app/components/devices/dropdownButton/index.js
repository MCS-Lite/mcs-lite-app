import React from 'react';
import c from 'classnames';
import { compose, pure, withHandlers, withProps } from 'recompose';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import WithDropdownMenu from '../../common/withDropdownMenu';

import styles from './styles.css';

const DropdownButton = ({
  dropdownItems,
  onMenuChange,
  className,
}) => (
  <div className={c(className, styles.base)}>
    <WithDropdownMenu
      onChange={onMenuChange}
      dropdownItems={dropdownItems}
    >
      <IconMoreVert size={24} />
    </WithDropdownMenu>
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Devices'),
  withProps(({ getMessages: t }) => ({
    dropdownItems: [
      { value: 'edit', children: t('edit') },
      { value: 'delete', children: t('delete') },
    ],
  })),
  withHandlers({
    onMenuChange: props => value => props.setSelectedMenuValue(value),
  }),
)(DropdownButton);
