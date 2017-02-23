import React, { Component } from 'react';

import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputSelect from 'mtk-ui/lib/InputSelect';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';
import messages from './messages';
import { withGetMessages } from 'react-intl-inject-hoc';

import styles from './dialog.css';
import InputPrototypeInfo from './inputPrototypeInfo';
import ImportJSON from './importJSON';
import UseExample from './useExample';

const CreateNewPrototypeDialog = ({
  isCreatePrototype,
  closeCreatePrototype,
  openCreatePrototype,
  createNewPrototype,
  createPrototypeType,
  setIsCreatePrototype,
  onCreatePrototypeType,
  retrievePrototypeTemplates,
  prototypeTemplates,
  setSelectedTemplate,
  selectedTemplate,
  setCreatePrototypeType,
  isDashboard,
  getMessages: t,
}) => {
  const createPrototypeOptions = [{
    value: 0,
    children: t('inputPrototypeInfo'),
  },{
    value: 1,
    children: t('importJSON'),
  },{
    value: 2,
    children: t('useExample'),
  }];

  return (
    <Dialog
      show={isCreatePrototype}
      size="large"
      onHide={closeCreatePrototype}
    >
      <DialogHeader>
        <div>
          {
            isDashboard
            ? t('clonePrototype')
            : t('createPrototype')
          }
        </div>
      </DialogHeader>
      {
        !isDashboard &&
        <DialogBody className={styles.createNewPrototypeDialogBody} style={{ padding : '20px 20px 0px 20px'}}>
          <InputForm
            kind="horizontal"
            style={{ backgroundColor: 'white' }}
          >
            <InputSelect
              placeholder={t('inputPrototypeInfo')}
              items={createPrototypeOptions}
              value={createPrototypeType}
              label={t('prototypeName')}
              filterFunc={() => true}
              valueRenderer={(value = {}) => {
                let children;
                createPrototypeOptions.forEach((k, v) => {
                  if (k.value === value) {
                    children = k.children;
                  }
                })
                return children;
              }}
              onChange={onCreatePrototypeType}
            />
          </InputForm>
        </DialogBody>
      }
      <DialogBody className={styles.createNewPrototypeDialogBody}>
        {
          createPrototypeType === 0 ?
            <InputPrototypeInfo
              isDashboard={isDashboard}
              createNewPrototype={createNewPrototype}
              closeCreatePrototype={closeCreatePrototype}
              setIsCreatePrototype={setIsCreatePrototype}
              prototypeName={selectedTemplate.prototypeName}
              version={selectedTemplate.version}
              prototypeDescription={selectedTemplate.prototypeDescription}
            /> : ''
        }
        { createPrototypeType === 1 ? <ImportJSON /> : '' }
        {
          createPrototypeType === 2 &&
            <UseExample
              retrievePrototypeTemplates={retrievePrototypeTemplates}
              prototypeTemplates={prototypeTemplates}
              setSelectedTemplate={setSelectedTemplate}
              setCreatePrototypeType={setCreatePrototypeType}
            />
        }
      </DialogBody>
    </Dialog>
  );
}

export default compose(
  pure,
  withState('createPrototypeType', 'setCreatePrototypeType', 0),
  withState('selectedTemplate', 'setSelectedTemplate', ({ defaultPrototype }) => defaultPrototype || {}),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    closeCreatePrototype: props => () => props.setIsCreatePrototype(false),
    onCreatePrototypeType: props => (e, value) => props.setCreatePrototypeType(value),
  }),
  withGetMessages(messages, 'Dialogs'),
 )(CreateNewPrototypeDialog)
