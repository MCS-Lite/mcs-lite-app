import React from 'react';
import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import InputGroup from 'mtk-ui/lib/InputGroup';
import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import IconDevice from 'mcs-lite-icon/lib/IconDevice';
import IconSearch from 'mcs-lite-icon/lib/IconSearch';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import styles from './styles.css';

const PanelHeaderLayout = ({
  filterKey,
  onInputTextChange,
  onSearch,
  getMessages: t,
}) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconDevice size={24} />} />
        <div className={styles.content}>
          {t('testDeviceList')}
          <InputGroup className={styles.searchGroup}>
            <InputText
              value={filterKey}
              onChange={onInputTextChange}
              placeholder={t('search')}
            />
            <Button
              className={styles.searchButton}
              onClick={onSearch}
            >
              <IconSearch size={18} />
            </Button>
          </InputGroup>
        </div>
      </PanelHeader>
    </Panel>
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Devices'),
  withHandlers({
    onInputTextChange: props => e => props.setFilterKey(e.target.value),
  }),
)(PanelHeaderLayout);
