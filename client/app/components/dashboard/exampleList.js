import React, { Component } from 'react';

import styles from './examples/styles.css';
import Panel from 'mtk-ui/lib/Panel';
import Button from 'mtk-ui/lib/Button';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from './messages';

import productBanner from '../prototypes/productBanner.png';
import Hr from '../common/hr';
import { browserHistory } from 'react-router';

import CreateNewPrototype from '../common/dialogs/createNewPrototype';
import moment from 'moment';

const ExampleListLayout = ({
  getMessages: t,
  clonePrototype,
  prototype,
  isCreatePrototype,
  setIsCreatePrototype,
  templates,
  createNewPrototype,
  openCreatePrototype,
}) => {
  return (
    <div key={prototype.prototypeId}>
      <TableRow>
        <TableCell>
          <img src={productBanner} className={styles.prototypeImg} />
        </TableCell>
        <TableCell>
          <p>{t('prototypeName')}</p>
          <a
            onClick={
              ()=> browserHistory.push('/prototypes/' + prototype.prototypeId)
            }
            className={styles.link}
          >{prototype.prototypeName}</a>
        </TableCell>
        <TableCell>
          <div>
            <p>{t('lastUpdateTime')}</p>
            {moment(prototype.updatedAt).format('YYYY-MM-DD h:mm')}
          </div>
        </TableCell>
        <TableCell>
          <Button onClick={()=>setIsCreatePrototype(true)}>{t('clonePrototype')}</Button>
        </TableCell>
      </TableRow>
      {
        isCreatePrototype &&
        <CreateNewPrototype
          createNewPrototype={createNewPrototype}
          isCreatePrototype
          setIsCreatePrototype={setIsCreatePrototype}
          prototypeTemplates={templates}
          isDashboard
          defaultPrototype={prototype}
        />
      }
    </div>
  );
}

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withGetMessages(messages, 'Dashboard'),
)(ExampleListLayout);
