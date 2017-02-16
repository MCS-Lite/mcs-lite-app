import React, { Component } from 'react';
import myPrototypeStyles from './myPrototype.css';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Button from 'mtk-ui/lib/Button';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

import Hr from '../common/hr';

import { browserHistory } from 'react-router';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';
import CreateNewPrototypeDialog from '../prototypes/dialogs/createNewPrototype';

const MyPrototypeLayout = ({
  getMessages: t,
  createNewPrototype,
  isCreatePrototype,
  setIsCreatePrototype,
  openCreatePrototype,
  userPrototypes,
  goToPrototypeList,
}) => {
  return (
    <div className={myPrototypeStyles.base}>
      <CreateNewPrototypeDialog
        createNewPrototype={createNewPrototype}
        isCreatePrototype={isCreatePrototype}
        setIsCreatePrototype={setIsCreatePrototype}
        isDashboard
      />
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          {t('myPrototype')}
        </PanelHeader>
      </Panel>
      <PanelBody>
        <div className={myPrototypeStyles.header}>
          {t('lastUpdatePrototype')}
          <a onClick={goToPrototypeList}className={myPrototypeStyles.link}>{t('allPrototypes')}</a>
        </div>
        <Hr />
        {
          userPrototypes.prototypeId ?
            <div>
              <a className={myPrototypeStyles.link}>{t('testDeviceList')}</a>

            </div>
          :
            <div className={myPrototypeStyles.noAnyPrototypes}>
              <p>{t('noAnyPrototypes')}</p>
              <Button type="submit" className={myPrototypeStyles.button} onClick={openCreatePrototype}>
                {t('create')}
              </Button>
            </div>
        }
      </PanelBody>
    </div>
  );
}

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    goToPrototypeList: props => () => browserHistory.push('/prototypes'),
  }),
  withGetMessages(messages, 'Dashboard'),
)(MyPrototypeLayout);