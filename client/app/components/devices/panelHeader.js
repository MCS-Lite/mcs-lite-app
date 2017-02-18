import React, { Component } from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import Panel from 'mtk-ui/lib/Panel';
import PanelHeader from 'mtk-ui/lib/PanelHeader';
import PanelIcon from 'mtk-ui/lib/PanelIcon';
import InputGroup from 'mtk-ui/lib/InputGroup';
import InputText from 'mtk-ui/lib/InputText';
import Button from 'mtk-ui/lib/Button';
import IconDevice from 'mcs-lite-icon/lib/IconDevice';
import IconSearch from 'mcs-lite-icon/lib/IconSearch';

import styles from './panelHeader.css';

const PanelHeaderLayout = ({ searchKey, onInputTextChange, onSearch }) => (
  <div className={styles.base}>
    <Panel>
      <PanelHeader>
        <PanelIcon icon={<IconDevice size={24}/>} />
        <div className={styles.content}>
          <span>Test device list</span>
          <form action={onSearch}>
            <InputGroup className={styles.searchGroup}>
              <InputText
                value={searchKey}
                onChange={onInputTextChange}
                placeholder="Search"
              />
              <Button
                className={styles.searchButton}
                onClick={onSearch}
              >
                <IconSearch size={18} />
              </Button>
            </InputGroup>
          </form>
        </div>
      </PanelHeader>
    </Panel>
  </div>
);

export default compose(
  pure,
  withState('searchKey', 'setSearchKey', ''),
  withHandlers({
    onInputTextChange: props => e => props.setSearchKey(e.target.value),
    onSearch: props => e => {
      props.setFilterKey(props.searchKey);
      e.preventDefault();
    }
  })
)(PanelHeaderLayout);
