import React from 'react';
import R from 'ramda';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Button, Heading } from 'mcs-lite-ui';
import Hr from 'mtk-ui/lib/Hr';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import { browserHistory } from 'react-router';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import productBanner from '../productBanner.png';
import CreatePrototype from '../../common/dialogs/createPrototype';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';
import WithDropdownMenu from '../../common/withDropdownMenu';
import EditPrototype from '../dialogs/editPrototype';

import styles from './styles.css';

const PrototypeCardLayout = ({
  prototype = {},
  main,
  openPrototypeDetail,
  onSelectMenuValueChange,
  selectMenuValue,
  setSelectMenuValue,
  editPrototype,
  onClone,
  onCancel,
  onDeleteSubmit,
  uploadPrototypeImage,
  pushToast,
  getMessages: t,
}) => {
  const {
    isTemplate,
    prototypeId,
    prototypeName,
    version,
    prototypeDescription,
    prototypeImageURL,
  } = prototype;

  let items = [
    { value: 'edit', children: t('edit') },
    { value: 'clone', children: t('clone') },
    { value: 'export', children: t('export') },
    { value: 'delete', children: t('delete') },
  ];

  if (isTemplate && !main.isAdmin) {
    items = [
      { value: 'clone', children: t('clone') },
      { value: 'export', children: t('export') },
    ];
  }
  return (
    <div className={styles.base}>
      <div>
        <div className={styles.more}>
          <WithDropdownMenu
            dropdownItems={items}
            onChange={onSelectMenuValueChange}
          >
            <IconMoreVert />
          </WithDropdownMenu>
        </div>
        <img
          src={
            prototypeImageURL
            ? window.apiUrl.replace('api', 'images/') + prototypeImageURL
            : productBanner
          }
          className={styles.img}
          alt="banner"
        />
        {
          selectMenuValue === 'clone' &&
          <CreatePrototype
            type="clone"
            title={t('cloneFromExistingPrototype')}
            introduction={t('cloneFromExistingPrototypeIntro')}
            template={prototype}
            onClone={onClone}
            onCancel={onCancel}
            uploadPrototypeImage={uploadPrototypeImage}
            pushToast={pushToast}
          />
        }
        {
          selectMenuValue === 'edit' &&
          <EditPrototype
            editPrototype={editPrototype}
            prototypeId={prototypeId}
            prototypeName={prototypeName}
            version={version}
            prototypeImageURL={prototypeImageURL}
            prototypeDescription={prototypeDescription}
            selectMenuValue={selectMenuValue}
            setSelectMenuValue={setSelectMenuValue}
            uploadPrototypeImage={uploadPrototypeImage}
            pushToast={pushToast}
          />
        }
        {
          selectMenuValue === 'delete' &&
          <DeleteConfirmDialog
            onDeleteSubmit={onDeleteSubmit}
            setSelectedMenuValue={setSelectMenuValue}
          />
        }
      </div>
      <div className={styles.content}>
        <div>
          <Heading
            level={4}
            className={styles.prototypeName}
          >
            {prototypeName} {isTemplate && '(Template)'}
          </Heading>
          <Hr className={styles.hr} />
          {
            !(R.isNil(version) || R.isEmpty(version)) &&
            <div>
              {t('version')} {version}
            </div>
          }
          {
            !(R.isNil(prototypeDescription) || R.isEmpty(prototypeDescription)) &&
            <div>
              <Hr className={styles.hr} />
              {t('prototypeDescription')} {prototypeDescription}
            </div>
          }
        </div>
        <Button onClick={openPrototypeDetail} block>
          {t('detail')}
        </Button>
      </div>
    </div>
  );
};

export default compose(
  pure,
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withHandlers({
    openPrototypeDetail: props => () => browserHistory.push(`/prototypes/${props.prototype.prototypeId}`),
    onSelectMenuValueChange: props => value => props.setSelectMenuValue(value),
    onClone: props => (id, data) => props.clonePrototype(id, data)
      .then(() => props.retrievePrototypeList()),
    onCancel: props => () => props.setSelectMenuValue(''),
    onDeleteSubmit: props => () => {
      props.deletePrototype(props.prototype.prototypeId);
      props.setSelectMenuValue('');
    },
  }),
  withGetMessages(messages, 'Prototypes'),
)(PrototypeCardLayout);
