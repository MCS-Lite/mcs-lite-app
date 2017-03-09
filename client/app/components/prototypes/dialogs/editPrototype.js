import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import Button from 'mtk-ui/lib/Button';
import Dialog from 'mtk-ui/lib/Dialog';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

import prototypeStyles from '../styles.css';

const EditPrototypeDialog = ({
  selectMenuValue,
  closeEditPrototype,
  editPrototypeName,
  onEditPrototypeNameChange,
  editPrototypeDescription,
  onEditPrototypeDescriptionChange,
  editVersion,
  onEditVersionChange,
  submitEditPrototype,
  error,
  getMessages: t,
}) => (
  <Dialog
    show={selectMenuValue === 'edit'}
    size="large"
    onHide={closeEditPrototype}
  >
    <DialogHeader>
      <div>{t('editPrototype')}</div>
    </DialogHeader>
    <DialogBody className={prototypeStyles.dialogBody}>
      <InputForm
        kind="horizontal"
        style={{ backgroundColor: 'white' }}
      >
        <InputText
          required
          value={editPrototypeName}
          label={t('prototypeName')}
          placeholder={t('inputThePrototypeName')}
          onChange={onEditPrototypeNameChange}
          error={error}
        />
        <InputText
          value={editVersion}
          label={t('prototypeVersion')}
          placeholder={t('inputThePrototypeVersion')}
          onChange={onEditVersionChange}
        />
        <InputTextarea
          label={t('prototypeDescription')}
          rows="4"
          value={editPrototypeDescription}
          style={{ resize: 'none' }}
          placeholder={t('inputThePrototypeDescription')}
          onChange={onEditPrototypeDescriptionChange}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeEditPrototype}>{t('cancel')}</Button>
      <Button kind="primary" onClick={submitEditPrototype}>
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withState('editPrototypeName', 'setEditPrototypeName', props => props.prototypeName),
  withState('editPrototypeDescription', 'setEditPrototypeDescription', props => props.prototypeDescription),
  withState('editVersion', 'setEditVersion', props => props.version),
  withState('error', 'setError', false),
  withHandlers({
    onEditVersionChange: props => e => props.setEditVersion(e.target.value),
    onEditPrototypeDescriptionChange: props => e =>
      props.setEditPrototypeDescription(e.target.value),
    onEditPrototypeNameChange: props => (e) => {
      props.setError(false);
      props.setEditPrototypeName(e.target.value);
    },
    closeEditPrototype: props => () => props.setSelectMenuValue(''),
    submitEditPrototype: props => () => {
      if (props.editPrototypeName.length === 0) {
        props.setError(true);
      } else {
        props.setSelectMenuValue('');
        props.editPrototype(props.prototypeId, {
          prototypeName: props.editPrototypeName,
          prototypeDescription: props.editPrototypeDescription,
          version: props.editVersion,
        });
      }
    },
  }),
  withGetMessages(messages, 'Prototypes'),
)(EditPrototypeDialog);
