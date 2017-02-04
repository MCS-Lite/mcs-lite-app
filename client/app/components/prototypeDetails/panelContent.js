import { connect } from 'react-redux';
import React, { Component } from 'react';

import panelContentStyles from './panelContent.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelBody from 'mtk-ui/lib/PanelBody';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import NewDisplayCard from './newDisplayCard';

const PanelContentLayout = ({
  prototypeId,
}) => {
  return (
    <div className={panelContentStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={panelContentStyles.content}>
            <ul>
              <li>Data channel</li>
              <li>Test device</li>
            </ul>
          </div>
        </PanelHeader>
        <PanelBody className={panelContentStyles.body}>
          <NewDisplayCard prototypeId={prototypeId}/>
        </PanelBody>
      </Panel>
    </div>
  );
}

export default PanelContentLayout;