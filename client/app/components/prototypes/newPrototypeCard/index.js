import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import Button from 'mtk-ui/lib/Button';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import CreatePrototype from '../../common/dialogs/createPrototype';

import styles from './styles.css';

const NewPrototypeCardLayout = ({
  isCreatePrototype,
  openCreatePrototype,
  retrievePrototypeTemplates,
  retrievePrototypeList,
  prototypeTemplates,
  getMessages: t,
  onCreate,
  onClone,
  onCancel,
  uploadPrototypeImage,
  pushToast,
  importJSON,
}) => (
  <div className={styles.base}>
    {
      isCreatePrototype &&
        <CreatePrototype
          type="new"
          onCreate={onCreate}
          onCancel={onCancel}
          onClone={onClone}
          templates={prototypeTemplates}
          retrievePrototypeTemplates={retrievePrototypeTemplates}
          retrievePrototypeList={retrievePrototypeList}
          uploadPrototypeImage={uploadPrototypeImage}
          pushToast={pushToast}
          importJSON={importJSON}
        />
    }
    {t('createYourPrototypeNow')}
    <Button
      type="submit"
      className={styles.button}
      onClick={openCreatePrototype}
    >
      {t('create')}
    </Button>
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Prototypes'),
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withHandlers({
    openCreatePrototype: props => () => props.setIsCreatePrototype(true),
    onCreate: props => value => props.createNewPrototype(value)
      .then(() => {
        props.pushToast({
          kind: 'success',
          message: props.getMessages('createPrototypeSuccess'),
        });
        props.retrievePrototypeList();
      }),
    onClone: props => (id, data) => props.clonePrototype(id, data)
      .then(() => props.retrievePrototypeList()),
    onCancel: props => () => props.setIsCreatePrototype(false),
  }),
)(NewPrototypeCardLayout);
