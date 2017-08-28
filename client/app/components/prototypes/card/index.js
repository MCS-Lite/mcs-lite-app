/* global document window Blob */
import React from 'react';
import PropTypes from 'prop-types';
import R from 'ramda';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Button, Heading } from 'mcs-lite-ui';
import Hr from 'mtk-ui/lib/Hr';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import { browserHistory } from 'react-router';
import { withGetMessages } from 'react-intl-inject-hoc';
import defaultBanner from 'images/banner.svg';
import messages from '../messages';
import CreatePrototype from '../../common/dialogs/createPrototype';
import DeleteConfirmDialog from '../../common/dialogs/deleteConfirmDialog';
import WithDropdownMenu from '../../common/withDropdownMenu';
import EditPrototype from '../dialogs/editPrototype';
import TemplateTag from '../templateTag';

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
  onExport,
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
    { value: 'export', children: t('export'), onClick: onExport },
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
              : defaultBanner
          }
          className={styles.img}
          alt="banner"
        />
        {isTemplate &&
          <div className={styles.templateTag}><TemplateTag /></div>}
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
            prototypeId={prototypeId}
            prototypeName={prototypeName}
            version={version}
            prototypeImageURL={prototypeImageURL}
            prototypeDescription={prototypeDescription}
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
      <div className={styles.content}>
        <div>
          <Heading level={4} className={styles.prototypeName}>
            {prototypeName} {isTemplate && '(Template)'}
          </Heading>
          <Hr className={styles.hr} />
          {!(R.isNil(version) || R.isEmpty(version)) &&
            <div>
              {t('version')}{version}
              <Hr className={styles.hr} />
            </div>}
          {!(R.isNil(prototypeDescription) ||
            R.isEmpty(prototypeDescription)) &&
            <span>{prototypeDescription}</span>}
        </div>
        <Button onClick={openPrototypeDetail} block>
          {t('detail')}
        </Button>
      </div>
    </div>
  );
};

PrototypeCardLayout.propTypes = {
  prototype: PropTypes.object,
  main: PropTypes.shape({
    userId: PropTypes.string,
    userName: PropTypes.string,
  }),
  openPrototypeDetail: PropTypes.func,
  onSelectMenuValueChange: PropTypes.func,
  selectMenuValue: PropTypes.string,
  setSelectMenuValue: PropTypes.func,
  editPrototype: PropTypes.func,
  onClone: PropTypes.func,
  onCancel: PropTypes.func,
  onExport: PropTypes.func,
  onDeleteSubmit: PropTypes.func,
  uploadPrototypeImage: PropTypes.func,
  pushToast: PropTypes.func,
  getMessages: PropTypes.func,
};

export default compose(
  pure,
  withGetMessages(messages, 'Prototypes'),
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withHandlers({
    openPrototypeDetail: props => () =>
      browserHistory.push(`/prototypes/${props.prototype.prototypeId}`),
    onSelectMenuValueChange: props => value => props.setSelectMenuValue(value),
    onClone: props => (id, data) =>
      props.clonePrototype(id, data).then(() => props.retrievePrototypeList()),
    onCancel: props => () => props.setSelectMenuValue(''),
    onDeleteSubmit: props => () => {
      props.deletePrototype(props.prototype.prototypeId);
      props.setSelectMenuValue('');
    },
    onExport: props => () => {
      const { prototypeId } = props.prototype;
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
  }),
)(PrototypeCardLayout);
