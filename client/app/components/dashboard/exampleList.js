import React, { Component } from 'react';

import examplesStyles from './examples.css';
import Panel from 'mtk-ui/lib/Panel';
import Button from 'mtk-ui/lib/Button';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Table from 'mtk-ui/lib/table/Table';
import TableHeader from 'mtk-ui/lib/table/TableHeader';
import TableCell from 'mtk-ui/lib/table/TableCell';
import TableRow from 'mtk-ui/lib/table/TableRow';

import { default as compose } from 'recompose/compose';
import { default as withState } from 'recompose/withState';
import { default as pure } from 'recompose/pure';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';

import productBanner from '../prototypes/productBanner.png';
import Hr from '../common/hr';
import { browserHistory } from 'react-router';

import ClonePrototype from '../prototypes/dialogs/clonePrototype';
import moment from 'moment';

const ExampleListLayout = ({
  getMessages: t,
  clonePrototype,
  prototype,
  selectMenuValue,
  setSelectMenuValue,
}) => {
  return (
    <div key={prototype.prototypeId}>
      <TableRow>
        <TableCell>
          <img src={productBanner} className={examplesStyles.prototypeImg} />
        </TableCell>
        <TableCell>
          <p>{t('prototypeName')}</p>
          <a
            onClick={
              ()=> browserHistory.push('/prototypes/' + prototype.prototypeId)
            }
            className={examplesStyles.link}
          >{prototype.prototypeName}</a>
        </TableCell>
        <TableCell>
          <div>
            <p>{t('lastUpdateTime')}</p>
            {moment(prototype.updatedAt).format('YYYY-MM-DD h:mm')}
          </div>
        </TableCell>
        <TableCell>
          <Button onClick={()=>{
            setSelectMenuValue('clone');
            console.log(1111);
          }}>{t('clonePrototype')}</Button>
        </TableCell>
      </TableRow>
      {
        setSelectMenuValue === 'clone' ?
        <ClonePrototype
          clonePrototype={clonePrototype}
          prototypeId={prototype.prototypeId}
          prototypeName={prototype.prototypeName}
          selectMenuValue={selectMenuValue}
          setSelectMenuValue={setSelectMenuValue}
        />
        : ''
      }
    </div>
  );
}

export default compose(
  pure,
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withGetMessages(messages, 'Dashboard'),
)(ExampleListLayout);