import React, { Component } from 'react';

import panelContentStyles from './panelContent.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import DataChannelContent from './dataChannelContent';
import TestDeviceContent from './testDeviceContent';

const PanelContentLayout = ({
  prototypeId,
  setSelectPanelValue,
  selectPanelValue,
}) => {
  return (
    <div className={panelContentStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={panelContentStyles.content}>
            <ul>
              <li><a onClick={() => setSelectPanelValue('Data channel')}>Data channel</a></li>
              <li><a onClick={() => setSelectPanelValue('Test device')}>Test device</a></li>
            </ul>
          </div>
        </PanelHeader>
        <PanelBody className={panelContentStyles.body}>
          { selectPanelValue === '' || selectPanelValue === 'Data channel' ? <DataChannelContent prototypeId={prototypeId} /> : ''}
          { selectPanelValue === 'Test device' ? <TestDeviceContent prototypeId={prototypeId} /> : ''}
        </PanelBody>
      </Panel>
    </div>
  );
}

export default compose(
  pure,
  withState('selectPanelValue', 'setSelectPanelValue', ''),
)(PanelContentLayout);