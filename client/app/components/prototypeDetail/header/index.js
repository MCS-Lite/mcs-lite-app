import React from 'react';
import c from 'classnames';
import { compose, pure, withState, withHandlers, withProps } from 'recompose';
import Hr from 'mtk-ui/lib/Hr';
import IconFold from 'mcs-lite-icon/lib/IconFold';
import { Heading, Button } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import EditPrototype from '../../prototypes/dialogs/editPrototype';
import DeletePrototype from '../../prototypes/dialogs/deletePrototype';
import ClonePrototype from '../../prototypes/dialogs/clonePrototype';
import CreateTestDeviceDialog from '../dialogs/createTestDevice';
import WithDropdownMenu from '../../common/withDropdownMenu';

import styles from './styles.css';

const PrototypeDetailHeaderLayout = ({
  user: {
    userName,
  } = {},
  prototypeName,
  prototypeId,
  prototypeDescription,
  version,
  isCreateTestDevice,
  isDropdownOpen,
  setIsCreateTestDevice,
  openCreateTestDevice,
  createTestDevice,
  onMenuChange,
  onMenuShowChange,
  selectMenuValue,
  editPrototype,
  clonePrototype,
  deletePrototype,
  setSelectMenuValue,
  dropdownItems,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          <Heading level={2}>{prototypeName}</Heading>
          <span>{`(ID: ${prototypeId})`}</span>
        </div>
        <div>
          <span className={styles.createUser}>{`${t('createUser')}${userName}`}</span>
          <span>{`${t('version')}${version}`}</span>
        </div>
      </div>
      <div className={styles.option}>
        <CreateTestDeviceDialog
          createTestDevice={createTestDevice}
          isCreateTestDevice={isCreateTestDevice}
          setIsCreateTestDevice={setIsCreateTestDevice}
          prototypeId={prototypeId}
        />
        <Button onClick={openCreateTestDevice}>
          {t('createTestDevice')}
        </Button>
        <WithDropdownMenu
          dropdownItems={dropdownItems}
          onChange={onMenuChange}
          onMenuShowChange={onMenuShowChange}
          menuClassName={styles.menu}
        >
          <Button kind="default">
            <div
              className={c(
                styles.dropdownButtonContent,
                isDropdownOpen && styles.dropdownOpen,
              )}
            >
              {t('more')}<IconFold size={18} />
            </div>
          </Button>
        </WithDropdownMenu>
        {
          selectMenuValue === 'clone' &&
            <ClonePrototype
              clonePrototype={clonePrototype}
              prototypeId={prototypeId}
              prototypeName={prototypeName}
              version={version}
              prototypeDescription={prototypeDescription}
              selectMenuValue={selectMenuValue}
              setSelectMenuValue={setSelectMenuValue}
            />
        }
        {
          selectMenuValue === 'edit' &&
            <EditPrototype
              editPrototype={editPrototype}
              prototypeId={prototypeId}
              prototypeName={prototypeName}
              version={version}
              prototypeDescription={prototypeDescription}
              selectMenuValue={selectMenuValue}
              setSelectMenuValue={setSelectMenuValue}
            />
        }
        {
          selectMenuValue === 'delete' &&
            <DeletePrototype
              deletePrototype={deletePrototype}
              prototypeId={prototypeId}
              selectMenuValue={selectMenuValue}
              setSelectMenuValue={setSelectMenuValue}
            />
          }
      </div>
    </div>
    <Hr className={styles.hr} />
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withState('isDropdownOpen', 'setIsDropdownOpen', false),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withProps(({ getMessages: t }) => ({
    dropdownItems: [
      { value: 'edit', children: t('edit') },
      { value: 'clone', children: t('clone') },
      { value: 'delete', children: t('delete') },
      { value: 'export', children: t('export') },
    ],
  })),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
    onMenuChange: props => value => props.setSelectMenuValue(value),
    onMenuShowChange: props => value => props.setIsDropdownOpen(value),
  }),
)(PrototypeDetailHeaderLayout);
