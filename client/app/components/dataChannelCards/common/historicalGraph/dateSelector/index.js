import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import { Button } from 'mcs-lite-ui';
import InputGroup from 'mtk-ui/lib/InputGroup';
import InputDateTime from 'mtk-ui/lib/InputDatetime';
import IconCalendar from 'mcs-lite-icon/lib/IconCalendar';
import IconRefresh from 'mcs-lite-icon/lib/IconRefresh';
import IconSearch from 'mcs-lite-icon/lib/IconSearch';

import styles from './styles.css';

const DateSelector = ({
  startDate,
  endDate,
  startFilter,
  endFilter,
  onStartFileterChange,
  onEndFilterChange,
  onSerach,
  onReset,
}) => (
  <div className={styles.base}>
    <InputGroup>
      <div className={styles.iconBlock}>
        <IconCalendar size={18} />
      </div>
      <InputDateTime
        selectedValue={startFilter || startDate}
        onSubmit={onStartFileterChange}
        locale="en"
        placement="top"
        format="YYYY-MM-DD HH:mm"
      />
      <div className={styles.toBlock}>
        To
      </div>
      <InputDateTime
        selectedValue={endFilter || endDate}
        onSubmit={onEndFilterChange}
        locale="en"
        placement="top"
        format="YYYY-MM-DD HH:mm"
      />
    </InputGroup>
    <Button className={styles.search} onClick={onSerach}>
      <IconSearch size={18} />
      搜尋
    </Button>
    <div className={styles.reset} onClick={onReset}>
      <IconRefresh size={18} />
      <span>清除搜尋條件</span>
    </div>
  </div>
);

export default compose(
  pure,
  withState('startFilter', 'setStartFilter', false),
  withState('endFilter', 'setEndFilter', false),
  withHandlers({
    onSerach: props => () => props.onSearch(props.startFilter, props.endFilter),
    onStartFileterChange: props => (e, value) => props.setStartFilter(value),
    onEndFilterChange: props => (e, value) => props.setEndFilter(value),
    onReset: props => () => {
      props.setStartFilter(false);
      props.setEndFilter(false);
      props.onSearch();
    },
  }),
)(DateSelector);
