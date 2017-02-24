import React, { Component } from 'react';

import styles from './styles.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

const PanelHeaderLayout = () => {
  return (
    <div className={styles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={styles.content}>
            Data channel
            API hint
          </div>
        </PanelHeader>
      </Panel>
    </div>
  );
}

export default PanelHeaderLayout;