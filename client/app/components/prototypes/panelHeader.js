import React, { Component } from 'react';

import panelHeaderStyles from './panelHeader.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';

import { default as compose } from 'recompose/compose';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const PanelHeaderLayout = ({
  getMessages: t
}) => {
  return (
    <div className={panelHeaderStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          <div className={panelHeaderStyles.content}>
            {t('prototypeList')}
          </div>
        </PanelHeader>
      </Panel>
    </div>
  );
}

export default compose(
  withGetMessages(messages, 'Prototypes'),
)(PanelHeaderLayout);