import React from 'react';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import PanelBody from 'mtk-ui/lib/PanelBody';
import Table from 'mtk-ui/lib/table/Table';
import { Heading } from 'mcs-lite-ui';
import IconPublic from 'mcs-lite-icon/lib/IconPublic';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import pure from 'recompose/pure';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import Hr from '../../common/hr';
import ExampleList from './exampleList';

import styles from './styles.css';

const ExamplesLayout = ({
  getMessages: t,
  clonePrototype,
  templates,
  createNewPrototype,
  retrieveDashboard,
  uploadPrototypeImage,
  pushToast,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader className={styles.panelHeader}>
        <PanelIcon icon={<IconPublic />} />
        <span>{t('example')}</span>
      </PanelHeader>
    </Panel>
    <PanelBody className={styles.panelBody}>
      <Heading level={4}>
        {t('shareWithMeExample')}
      </Heading>
      <Hr />
      <Table>
        {
          templates.map(prototype => (
            <ExampleList
              prototype={prototype}
              clonePrototype={clonePrototype}
              key={prototype.prototypeId}
              templates={templates}
              createNewPrototype={createNewPrototype}
              uploadPrototypeImage={uploadPrototypeImage}
              retrieveDashboard={retrieveDashboard}
              pushToast={pushToast}
            />
          ))
        }
      </Table>
      <Hr />
    </PanelBody>
  </div>
);

export default compose(
  pure,
  withState('selectMenuValue', 'setSelectMenuValue', ''),
  withGetMessages(messages, 'Dashboard'),
)(ExamplesLayout);
