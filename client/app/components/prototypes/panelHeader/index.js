import React from 'react';
import { compose, withHandlers } from 'recompose';
import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import InputGroup from 'mtk-ui/lib/InputGroup';
import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import IconPrototype from 'mcs-lite-icon/lib/IconPrototype';
import IconSearch from 'mcs-lite-icon/lib/IconSearch';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import styles from './styles.css';

const PanelHeaderLayout = ({
  getMessages: t,
  filterKey,
  onInputTextChange,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconPrototype size={24} />} />
        <div className={styles.content}>
          {t('prototypeList')}
          <InputGroup className={styles.searchGroup}>
            <InputText
              value={filterKey}
              onChange={onInputTextChange}
              placeholder={t('search')}
            />
            <Button className={styles.searchButton}>
              <IconSearch size={18} />
            </Button>
          </InputGroup>
        </div>
      </PanelHeader>
    </Panel>
  </div>
);

export default compose(
  withGetMessages(messages, 'Prototypes'),
  withHandlers({
    onInputTextChange: props => e => props.setFilterKey(e.target.value),
  }),
)(PanelHeaderLayout);
