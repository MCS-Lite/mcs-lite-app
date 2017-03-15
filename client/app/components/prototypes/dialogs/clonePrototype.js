import React from 'react';
import { compose, pure, withState, withHandlers } from 'recompose';
import Button from 'mtk-ui/lib/Button';
import DialogHeader from 'mtk-ui/lib/DialogHeader';
import DialogBody from 'mtk-ui/lib/DialogBody';
import DialogFooter from 'mtk-ui/lib/DialogFooter';
import InputForm from 'mtk-ui/lib/InputForm';
import InputText from 'mtk-ui/lib/InputText';
import InputTextarea from 'mtk-ui/lib/InputTextarea';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import Dialog from '../../common/dialog';

import prototypeStyles from '../styles.css';

const ClonePrototypeDialog = ({
  selectMenuValue,
  closeClonePrototype,
  clonePrototypeName,
  onClonePrototypeNameChange,
  cloneVersion,
  onCloneVersionChange,
  clonePrototypeDescription,
  onClonePrototypeDescriptionChange,
  submitClonePrototype,
  error,
  getMessages: t,
}) => (
  <Dialog
    show={selectMenuValue === 'clone'}
    size="large"
    onHide={closeClonePrototype}
  >
    <DialogHeader>
      <div>{t('cloneFromExistingPrototype')}</div>
    </DialogHeader>
    <DialogBody className={prototypeStyles.dialogBody}>
      <InputForm
        kind="horizontal"
        style={{ backgroundColor: 'white' }}
      >
        <InputText
          required
          value={clonePrototypeName}
          label={t('prototypeName')}
          placeholder={t('inputThePrototypeName')}
          onChange={onClonePrototypeNameChange}
          error={error}
        />
        <InputText
          value={cloneVersion}
          label={t('prototypeVersion')}
          placeholder={t('inputThePrototypeVersion')}
          onChange={onCloneVersionChange}
        />
        <InputTextarea
          label={t('prototypeDescription')}
          rows="4"
          value={clonePrototypeDescription}
          style={{ resize: 'none' }}
          placeholder={t('inputThePrototypeDescription')}
          onChange={onClonePrototypeDescriptionChange}
        />
      </InputForm>
    </DialogBody>
    <DialogFooter>
      <Button kind="cancel" onClick={closeClonePrototype}>{t('cancel')}</Button>
      <Button kind="primary" onClick={submitClonePrototype} >
        {t('save')}
      </Button>
    </DialogFooter>
  </Dialog>
);

export default compose(
  pure,
  withState('clonePrototypeName', 'setClonePrototypeName', props => props.prototypeName),
  withState('clonePrototypeDescription', 'setClonePrototypeDescription', props => props.prototypeDescription),
  withState('cloneVersion', 'setCloneVersion', props => props.version),
  withState('error', 'setError', false),
  withHandlers({
    onClonePrototypeDescriptionChange: props => e =>
      props.setClonePrototypeDescription(e.target.value),
    onCloneVersionChange: props => e => props.setCloneVersion(e.target.value),
    onClonePrototypeNameChange: props => (e) => {
      props.setClonePrototypeName(e.target.value);
      props.setError(false);
    },
    closeClonePrototype: props => () => props.setSelectMenuValue(''),
    submitClonePrototype: props => () => {
      if (props.clonePrototypeName.length === 0) {
        props.setError(true);
      } else {
        props.setSelectMenuValue('');
        props.clonePrototype(props.prototypeId, {
          prototypeName: props.clonePrototypeName,
          prototypeDescription: props.clonePrototypeDescription,
          version: props.cloneVersion,
        });
      }
    },
  }),
  withGetMessages(messages, 'Prototypes'),
)(ClonePrototypeDialog);
