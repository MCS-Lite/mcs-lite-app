import React from 'react';

import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';

import compose from 'recompose/compose';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';
import Dialog from '../../../common/dialog';
import SelectDisplayCard from '../selectDisplayCard';
import CreateDataChannel from '../createDataChannel';
import styles from './styles.css';

const CreateDataChannelDialog = ({
  closeSelectCreateDataChannel,
  setIsCreateDataChannel,
  isCreateDataChannel,
  displayCardType,
  setDisplayCardType,
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
  <Dialog
    show={isSelectCreateDataChannel}
    size="large"
    onHide={closeSelectCreateDataChannel}
  >
    <DialogHeader>
      <div>{t('addNewDataChannel')}</div>
    </DialogHeader>
    <DialogBody className={styles.content}>
      <SelectDisplayCard
        setIsCreateDataChannel={setIsCreateDataChannel}
        displayCardType={1}
        setDisplayCardType={setDisplayCardType}
        title={t('control')}
        description={t('controlHint')}
      />
      <SelectDisplayCard
        setIsCreateDataChannel={setIsCreateDataChannel}
        displayCardType={2}
        setDisplayCardType={setDisplayCardType}
        title={t('display')}
        description={t('displayHint')}
      />
      {
        isCreateDataChannel &&
        <CreateDataChannel
          checkDatachannelIdAvailable={checkDatachannelIdAvailable}
          createDataChannel={createDataChannel}
          prototypeId={prototypeId}
          displayCardType={displayCardType}
          isCreateDataChannel={isCreateDataChannel}
          setIsCreateDataChannel={setIsCreateDataChannel}
          setIsSelectCreateDataChannel={setIsSelectCreateDataChannel}
          retrieveUnitTypes={retrieveUnitTypes}
          createUnitTypes={createUnitTypes}
          unitTypes={unitTypes}
          pushToast={pushToast}
        />
      }
    </DialogBody>
  </Dialog>
);

export default compose(
  pure,
  withState('displayCardType', 'setDisplayCardType', 0),
  withState('isCreateDataChannel', 'setIsCreateDataChannel', false),
  withHandlers({
    closeSelectCreateDataChannel: props => () => props.setIsSelectCreateDataChannel(false),
  }),
  withGetMessages(messages, 'PrototypeDetail'),
)(CreateDataChannelDialog);
