import React from 'react';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withHandlers from 'recompose/withHandlers';

import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import ControlSwitch from 'mcs-lite-ui/lib/DataChannel/ControlSwitch';
import DisplayStatus from 'mcs-lite-ui/lib/DataChannel/DisplayStatus';
import { Heading } from 'mcs-lite-ui'

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

const DisplayCardLayout = ({
  title,
  description,
  submitDisplayCard,
  getMessages: t,
  displayCardType,
}) => (
  <div className={styles.base}>
    <div className={styles.content}>
      {
        displayCardType === 1
        ? <ControlSwitch onSubmit={() => {}} value={1} />
        : <DisplayStatus labels={['OFF', 'ON']} value={0} style={{ width: 110, height: 52 }} />
      }
    </div>
    <Heading level={4}>{title}</Heading>
    <Hr className={styles.hr} />
    <span>{description}</span>
    <Button className={styles.button} onClick={submitDisplayCard}>
      {t('add')}
    </Button>
  </div>
);

export default compose(
  pure,
  withHandlers({
    submitDisplayCard: props => () => {
      props.setIsCreateDataChannel(true);
      props.setDisplayCardType(props.displayCardType);
    },
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(DisplayCardLayout);
