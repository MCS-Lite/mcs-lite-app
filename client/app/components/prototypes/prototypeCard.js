import { connect } from 'react-redux';
import React, { Component } from 'react';

import prototypeCardStyles from './prototypeCard.css';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import MiMoreVert from 'mtk-icon/lib/MiMoreVert';
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



const PrototypeCardLayout = ({
  prototypeName,
  prototypeId,
  prototypeDescription,
  version,
  openPrototypeDetail,
  onSelectMenuValueChange,
  isSelectMenu,
  selectMenuValue,
  openSelectMenu,
  setSelectMenuValue,
}) => {
  return (
    <div className={prototypeCardStyles.base}>
      <div>
        <MiMoreVert className={prototypeCardStyles.more} onClick={openSelectMenu} />
        <img src={productBanner} className={prototypeCardStyles.img} />
        {
          isSelectMenu ?
            <Menu
            className={prototypeCardStyles.menu}
            onChange={onSelectMenuValueChange}
            selectedValue={selectMenuValue}
            items={[
              { value: 'edit', children: 'Edit' },
              { value: 'clone', children: 'Clone' },
              { value: 'export', children: 'Export' },
              { value: 'delete', children: 'Delete' },
            ]}
          />
          : ''
        }
        { selectMenuValue === 'clone' ? <ClonePrototype prototypeName={prototypeName} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'edit' ? <EditPrototype prototypeName={prototypeName} version={version} prototypeDescription={prototypeDescription} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}
        { selectMenuValue === 'delete' ? <DeletePrototype prototypeId={prototypeId} selectMenuValue={selectMenuValue} setSelectMenuValue={setSelectMenuValue} /> : ''}

      </div>
      <div className={prototypeCardStyles.content}>
        <h3
          className={prototypeCardStyles.prototypeName}
        >
          {prototypeName}
        </h3>
        <Hr className={prototypeCardStyles.hr}/>
          Version: {version}
        <Hr />
        <Button className={prototypeCardStyles.button} onClick={openPrototypeDetail}>
          Detail
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
    onSelectMenuValueChange: props => (e, value) => props.setSelectMenuValue(value),
    openSelectMenu: props => (e) => props.setIsSelectMenu(!props.isSelectMenu),
  }),
)(PrototypeCardLayout);