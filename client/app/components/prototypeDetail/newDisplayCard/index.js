import React from 'react';

import Button from 'mtk-ui/lib/Button';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import SelectCreateDataChannelDialog from '../dialogs/selectCreateDataChannel';

import styles from './styles.css';

const NewDisplayCardLayout = ({
  openSelectCreateDataChannel,
  isSelectCreateDataChannel,
  setIsSelectCreateDataChannel,
  prototypeId,
  checkDatachannelIdAvailable,
  createDataChannel,
  getMessages: t,
  retrieveUnitTypes,
  createUnitTypes,
  unitTypes,
  pushToast,
}) => (
  <div className={styles.base}>
    <p>{t('addDataChannelNow')}</p>
    <Button
      className={styles.button}
      onClick={openSelectCreateDataChannel}
    >
      {t('add')}
    </Button>
    <SelectCreateDataChannelDialog
      prototypeId={prototypeId}
      checkDatachannelIdAvailable={checkDatachannelIdAvailable}
      createDataChannel={createDataChannel}
      isSelectCreateDataChannel={isSelectCreateDataChannel}
      setIsSelectCreateDataChannel={setIsSelectCreateDataChannel}
      retrieveUnitTypes={retrieveUnitTypes}
      createUnitTypes={createUnitTypes}
      unitTypes={unitTypes}
      pushToast={pushToast}
    />
  </div>
);

export default compose(
  pure,
  withState('isSelectCreateDataChannel', 'setIsSelectCreateDataChannel', false),
  withHandlers({
    openSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(true),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(NewDisplayCardLayout);
