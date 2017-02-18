import React, { Component } from 'react';

import prototypeCardStyles from './prototypeCard.css';
import { Button } from 'mcs-lite-ui';
import Hr from 'mtk-ui/lib/Hr';
import IconMoreVert from 'mcs-lite-icon/lib/IconMoreVert';
import Menu from 'mtk-ui/lib/Menu';

import productBanner from './productBanner.png';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import { browserHistory } from 'react-router';

import ClonePrototype from './dialogs/clonePrototype';
import EditPrototype from './dialogs/editPrototype';
import DeletePrototype from './dialogs/deletePrototype';

import messages from './messages';
import withGetMessages from '../../utils/withGetMessage';

const PrototypeCardLayout = ({
  prototypeName,
  prototypeId,
  prototypeDescription,
  version,
  isTemplate,
  main,
  openPrototypeDetail,
  onSelectMenuValueChange,
  isSelectMenu,
  selectMenuValue,
  openSelectMenu,
  setSelectMenuValue,
  clonePrototype,
  deletePrototype,
  editPrototype,
  getMessages: t,
}) => {
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
    <div className={prototypeCardStyles.base}>
      <div>
        <IconMoreVert className={prototypeCardStyles.more} onClick={openSelectMenu} />
        <img src={productBanner} className={prototypeCardStyles.img} />
        {
          isSelectMenu ?
            <Menu
            className={prototypeCardStyles.menu}
            onChange={onSelectMenuValueChange}
            selectedValue={selectMenuValue}
            items={items}
          />
          : ''
        }
        { selectMenuValue === 'clone' ? <ClonePrototype clonePrototype={clonePrototype} prototypeId={prototypeId} prototypeName={prototypeName} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'edit' ? <EditPrototype editPrototype={editPrototype} prototypeId={prototypeId} prototypeName={prototypeName} version={version} prototypeDescription={prototypeDescription} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'delete' ? <DeletePrototype deletePrototype={deletePrototype} prototypeId={prototypeId} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
      </div>
      <div className={prototypeCardStyles.content}>
        <h3
          className={prototypeCardStyles.prototypeName}
        >
          {prototypeName} {isTemplate ? '(Template)' : ''}
        </h3>
        <Hr className={prototypeCardStyles.hr} />
          {t('version')}: {version}
        <Hr />
        <Button onClick={openPrototypeDetail} block>
          {t('detail')}
        </Button>
      </div>
    </div>
  );
}

export default compose(
  pure,
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withState('isSelectMenu', 'setIsSelectMenu', false),
  withHandlers({
    openPrototypeDetail: props => () => browserHistory.push('/prototypes/' + props.prototypeId),
    onSelectMenuValueChange: props => (e, value) => {
      props.setIsSelectMenu(false);
      props.setSelectMenuValue(value);
    },
    openSelectMenu: props => (e) => props.setIsSelectMenu(!props.isSelectMenu),
  }),
  withGetMessages(messages, 'Prototypes'),
)(PrototypeCardLayout);