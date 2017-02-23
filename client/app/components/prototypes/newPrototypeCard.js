import React, { Component } from 'react';

import newPrototypeCardStyles from './newPrototypeCard.css';
import CreateNewPrototypeDialog from '../common/dialogs/createNewPrototype';

import Button from 'mtk-ui/lib/Button';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const NewPrototypeCardLayout = ({
  isCreatePrototype,
  openCreatePrototype,
  setIsCreatePrototype,
  createNewPrototype,
  prototypeName,
  retrievePrototypeTemplates,
  prototypeTemplates,
  getMessages: t,
}) => {
  return (
    <div className={newPrototypeCardStyles.base}>
      <CreateNewPrototypeDialog
        createNewPrototype={createNewPrototype}
        isCreatePrototype={isCreatePrototype}
        setIsCreatePrototype={setIsCreatePrototype}
        retrievePrototypeTemplates={retrievePrototypeTemplates}
        prototypeTemplates={prototypeTemplates}
      />
      {t('createYourPrototypeNow')}
      <Button type="submit" className={newPrototypeCardStyles.button} onClick={openCreatePrototype}>
        {t('create')}
      </Button>
    </div>
  );
}

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
  }),
  withGetMessages(messages, 'Prototypes'),
)(NewPrototypeCardLayout)
