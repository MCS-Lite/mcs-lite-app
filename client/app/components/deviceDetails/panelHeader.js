import React, { Component } from 'react';

import panelHeaderStyles from './panelHeader.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

const PanelHeaderLayout = () => {
  return (
    <div className={panelHeaderStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={panelHeaderStyles.content}>
            Data channel
            API hint
          </div>
        </PanelHeader>
      </Panel>
    </div>
  );
}

export default PanelHeaderLayout;