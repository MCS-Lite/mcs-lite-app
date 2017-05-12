/* global document window Blob */
import React from 'react';
import PropTypes from 'prop-types';
import c from 'classnames';
import { compose, pure, withState, withHandlers, withProps } from 'recompose';
import Hr from 'mtk-ui/lib/Hr';
import IconFold from 'mcs-lite-icon/lib/IconFold';
import { Heading, Button } from 'mcs-lite-ui';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import EditPrototype from '../../prototypes/dialogs/editPrototype';
import TemplateTag from '../../prototypes/templateTag';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';
import CreatePrototype from '../../common/dialogs/createPrototype';
import CreateTestDeviceDialog from '../dialogs/createTestDevice';
import WithDropdownMenu from '../../common/withDropdownMenu';

import styles from './styles.css';

const PrototypeDetailHeaderLayout = ({
  user: { userName } = {},
  prototype = {},
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
  onClone,
  onCancel,
  onDeleteSubmit,
  setSelectMenuValue,
  dropdownItems,
  uploadPrototypeImage,
  uploadDeviceImage,
  pushToast,
  readOnly,
  isTemplate,
  isAdmin,
  markTemplate,
  unmarkTemplate,
  openClonePrototype,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.infoHeader}>
          {isTemplate && <TemplateTag getMessages={t} />}
          <Heading level={2}>{prototype.prototypeName}</Heading>
          <span>{`(ID: ${prototype.prototypeId})`}</span>
        </div>
        <div>
          <span
            className={styles.createUser}
          >{`${t('createUser')}${userName}`}</span>
          <span>{`${t('version')}${version}`}</span>
        </div>
      </div>
      <div className={styles.option}>
        <CreateTestDeviceDialog
          createTestDevice={createTestDevice}
          isCreateTestDevice={isCreateTestDevice}
          setIsCreateTestDevice={setIsCreateTestDevice}
          prototypeId={prototype.prototypeId}
          uploadDeviceImage={uploadDeviceImage}
          pushToast={pushToast}
        />
        <Button onClick={readOnly ? openClonePrototype : openCreateTestDevice}>
          {readOnly ? t('createPrototypeFromTemplate') : t('createTestDevice')}
        </Button>
        {isAdmin &&
          <Button onClick={isTemplate ? unmarkTemplate : markTemplate}>
            {isTemplate ? t('unmarkTemplate') : t('markTemplate')}
          </Button>}
        {!readOnly &&
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
          </WithDropdownMenu>}
        {selectMenuValue === 'clone' &&
          <CreatePrototype
            type="clone"
            title={t('cloneFromExistingPrototype')}
            introduction={t('cloneFromExistingPrototypeIntro')}
            template={prototype}
            onClone={onClone}
            onCancel={onCancel}
            uploadPrototypeImage={uploadPrototypeImage}
            pushToast={pushToast}
          />}
        {selectMenuValue === 'edit' &&
          <EditPrototype
            editPrototype={editPrototype}
            prototypeId={prototype.prototypeId}
            prototypeName={prototype.prototypeName}
            prototypeImageURL={prototype.prototypeImageURL}
            version={version}
            prototypeDescription={prototype.prototypeDescription}
            selectMenuValue={selectMenuValue}
            setSelectMenuValue={setSelectMenuValue}
            uploadPrototypeImage={uploadPrototypeImage}
            pushToast={pushToast}
          />}
        {selectMenuValue === 'delete' &&
          <DeleteConfirmDialog
            onDeleteSubmit={onDeleteSubmit}
            setSelectedMenuValue={setSelectMenuValue}
          />}
      </div>
    </div>
    <Hr className={styles.hr} />
  </div>
);

PrototypeDetailHeaderLayout.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
  }),
  prototype: PropTypes.shape({
    prototypeId: PropTypes.string,
    prototypeImageURL: PropTypes.string,
    prototypeName: PropTypes.string,
    prototypeDescription: PropTypes.string,
  }),
  version: PropTypes.string,
  isCreateTestDevice: PropTypes.bool,
  isDropdownOpen: PropTypes.bool,
  setIsCreateTestDevice: PropTypes.func,
  openCreateTestDevice: PropTypes.func,
  createTestDevice: PropTypes.func,
  onMenuChange: PropTypes.func,
  onMenuShowChange: PropTypes.func,
  selectMenuValue: PropTypes.string,
  editPrototype: PropTypes.func,
  onClone: PropTypes.func,
  onCancel: PropTypes.func,
  onDeleteSubmit: PropTypes.func,
  setSelectMenuValue: PropTypes.func,
  dropdownItems: PropTypes.array,
  uploadPrototypeImage: PropTypes.func,
  uploadDeviceImage: PropTypes.func,
  pushToast: PropTypes.func,
  readOnly: PropTypes.bool,
  isTemplate: PropTypes.bool,
  openClonePrototype: PropTypes.func,
  getMessages: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  markTemplate: PropTypes.func,
  unmarkTemplate: PropTypes.func,
};

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
  withState('isCreateTestDevice', 'setIsCreateTestDevice', false),
  withState('isDropdownOpen', 'setIsDropdownOpen', false),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withHandlers({
    openCreateTestDevice: props => () => props.setIsCreateTestDevice(true),
    openClonePrototype: props => () => props.setSelectMenuValue('clone'),
    onMenuChange: props => value => props.setSelectMenuValue(value),
    onMenuShowChange: props => value => props.setIsDropdownOpen(value),
    onClone: props => (id, data) => props.clonePrototype(id, data),
    onCancel: props => () => props.setSelectMenuValue(''),
    onDeleteSubmit: props => () => {
      props.deletePrototype(props.prototype.prototypeId);
      props.setSelectMenuValue('');
    },
    onExport: props => () => {
      const { prototypeId } = props;
      props.exportJSON(prototypeId).then(({ data }) => {
        const json = JSON.stringify(data, null, '\t');
        const blob = new Blob([json], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);

        const ghostLink = document.createElement('a');
        ghostLink.href = url;
        ghostLink.setAttribute('download', `${prototypeId}.json`);
        ghostLink.setAttribute('target', '_blank');
        document.body.appendChild(ghostLink);
        ghostLink.click();
        document.body.removeChild(ghostLink);

        props.pushToast({
          kind: 'success',
          message: props.getMessages('exportSuccess'),
        });
      });
    },
    markTemplate: props => () =>
      props
        .setPrototypeToTemplate({
          prototypeId: props.prototypeId,
          status: true,
        })
        .then(() => {
          props.retrievePrototype(props.prototypeId);
          props.pushToast({
            kind: 'success',
            message: props.getMessages('markTemplateSuccess'),
          });
        }),
    unmarkTemplate: props => () =>
      props
        .setPrototypeToTemplate({
          prototypeId: props.prototypeId,
          status: false,
        })
        .then(() => {
          props.retrievePrototype(props.prototypeId);
          props.pushToast({
            kind: 'success',
            message: props.getMessages('unmarkTemplateSuccess'),
          });
        }),
  }),
  withProps(({ getMessages: t, readOnly, onExport }) => {
    if (readOnly) {
      return {
        dropdownItems: [{ value: 'clone', children: t('clone') }],
      };
    }

    return {
      dropdownItems: [
        { value: 'edit', children: t('edit') },
        { value: 'clone', children: t('clone') },
        { value: 'delete', children: t('delete') },
        { value: 'export', children: t('export'), onClick: onExport },
      ],
    };
  }),
)(PrototypeDetailHeaderLayout);
