import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Button } from 'mcs-lite-ui';
import Hr from 'mtk-ui/lib/Hr';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import Menu from 'mtk-ui/lib/Menu';

import { browserHistory } from 'react-router';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import productBanner from '../productBanner.png';
import CreatePrototype from '../../common/dialogs/createPrototype';
import EditPrototype from '../dialogs/editPrototype';
import DeletePrototype from '../dialogs/deletePrototype';

import styles from './styles.css';

const PrototypeCardLayout = ({
  prototype = {},
  main,
  openPrototypeDetail,
  onSelectMenuValueChange,
  isSelectMenu,
  selectMenuValue,
  openSelectMenu,
  setSelectMenuValue,
  deletePrototype,
  editPrototype,
  onClone,
  onCancel,
  getMessages: t,
}) => {
  let items = [
    { value: 'edit', children: t('edit') },
    { value: 'clone', children: t('clone') },
    { value: 'export', children: t('export') },
    { value: 'delete', children: t('delete') },
  ];

  if (prototype.isTemplate && !main.isAdmin) {
    items = [
      { value: 'clone', children: t('clone') },
      { value: 'export', children: t('export') },
    ];
  }
  return (
    <div className={styles.base}>
      <div>
        <IconMoreVert className={styles.more} onClick={openSelectMenu} />
        <img src={productBanner} className={styles.img} alt="banner" />
        {
          isSelectMenu &&
            <Menu
              className={styles.menu}
              onChange={onSelectMenuValueChange}
              selectedValue={selectMenuValue}
              items={items}
            />
        }
        {
          selectMenuValue === 'clone' &&
          <CreatePrototype
            type="clone"
            title={t('cloneFromExistingPrototype')}
            introduction={t('cloneFromExistingPrototypeIntro')}
            template={prototype}
            onClone={onClone}
            onCancel={onCancel}
          />
        }
        {
          selectMenuValue === 'edit' &&
          <EditPrototype
            editPrototype={editPrototype}
            prototypeId={prototype.prototypeId}
            prototypeName={prototype.prototypeName}
            version={prototype.version}
            prototypeDescription={prototype.prototypeDescription}
            selectMenuValue={selectMenuValue}
            setSelectMenuValue={setSelectMenuValue}
          />
        }
        {
          selectMenuValue === 'delete' &&
          <DeletePrototype
            deletePrototype={deletePrototype}
            prototypeId={prototype.prototypeId}
            selectMenuValue={selectMenuValue}
            setSelectMenuValue={setSelectMenuValue}
          />
        }
      </div>
      <div className={styles.content}>
        <h3
          className={styles.prototypeName}
        >
          {prototype.prototypeName} {prototype.isTemplate && '(Template)'}
        </h3>
        <Hr className={styles.hr} />
        {t('version')}: {prototype.version}
        <Hr />
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
  withState('isSelectMenu', 'setIsSelectMenu', false),
  withHandlers({
    openPrototypeDetail: props => () => browserHistory.push(`/prototypes/${props.prototypeId}`),
    onSelectMenuValueChange: props => (e, value) => {
      props.setIsSelectMenu(false);
      props.setSelectMenuValue(value);
    },
    openSelectMenu: props => () => props.setIsSelectMenu(!props.isSelectMenu),
    onClone: props => (id, data) => props.clonePrototype(id, data)
      .then(() => props.retrievePrototypeList()),
    onCancel: props => () => props.setSelectMenuValue(''),
  }),
  withGetMessages(messages, 'Prototypes'),
)(PrototypeCardLayout);
