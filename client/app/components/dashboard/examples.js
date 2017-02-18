import React, { Component } from 'react';

import examplesStyles from './examples.css';
import Panel from 'mtk-ui/lib/Panel';
import Button from 'mtk-ui/lib/Button';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from '../common/panelIcon';
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

import ExampleList from './ExampleList';
import IconPublic from 'mcs-lite-icon/lib/IconPublic';

const ExamplesLayout = ({
  getMessages: t,
  setSelectMenuValue,
  clonePrototype,
  templates,
  selectMenuValue,
}) => {
  return (
    <div className={examplesStyles.base}>
      <Panel>
        <PanelHeader className={examplesStyles.panelHeader}>
          <PanelIcon>
            <IconPublic />
          </PanelIcon>
          <span>{t('example')}</span>
        </PanelHeader>
      </Panel>
      <PanelBody>
        {t('shareWithMeExample')}
        <Hr />
        <Table style={{ borderBottom: '1px solid #D1D2D3' }}>
          {
            templates.map((prototype) => {
              return (
                <ExampleList prototype={prototype} clonePrototype={clonePrototype} key={prototype.prototypeId} />
              );
            })
          }
        </Table>
      </PanelBody>
    </div>
  );
}

export default compose(
  pure,
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withGetMessages(messages, 'Dashboard'),
)(ExamplesLayout);