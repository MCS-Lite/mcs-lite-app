import React, { Component } from 'react';

import examplesStyles from './examples.css';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';

import { default as compose } from 'recompose/compose';
import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';

const ExamplesLayout = ({
  getMessages: t,
}) => {
  return (
    <div className={examplesStyles.base}>
      <Panel>
        <PanelHeader>
          <PanelIcon iconName="bookmark" />
          {t('example')}
        </PanelHeader>
      </Panel>
      <PanelBody>
        {t('shareWithMeExample')}
      </PanelBody>
    </div>
  );
}

export default compose(
  withGetMessages(messages, 'Dashboard'),
)(ExamplesLayout);