import React from 'react';
import { compose, pure, withProps, withState, withHandlers } from 'recompose';
import { isNil, prop } from 'ramda';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import DialogWrapper from '../wrapper';
import MethodSelector from './methodSelector';
import InfoForm from './infoForm';
import ImportJSON from './importJSON';
import TemplateSelector from './templateSelector';

import styles from './styles.css';

const CreatePrototype = ({
  type,
  method,
  title,
  introduction,
  onMethodChange,
  prototypeInfo,
  setPrototypeInfo,
  templates,
  template,
  setTemplate,
  selectedTemplateName,
  setSelectedTemplateName,
  onConfirm,
  onCancel,
  error,
  setError,
  uploadPrototypeImage,
  pushToast,
  json,
  onJsonChange,
  getMessages: t,
}) => (
  <DialogWrapper
    show
    size="large"
    title={title}
    confirmText={t('save')}
    onCancel={onCancel}
    onConfirm={onConfirm}
    dialogBodyClassName={styles.dialogBody}
  >
    {
      introduction &&
        <div className={styles.introduction}>{introduction}</div>
    }
    {
      type === 'new' &&
      <MethodSelector
        value={method}
        onChange={onMethodChange}
      />
    }
    {
      (type === 'new' && method === 'new') &&
        <InfoForm
          error={error}
          setError={setError}
          prototypeInfo={prototypeInfo}
          setPrototypeInfo={setPrototypeInfo}
          uploadPrototypeImage={uploadPrototypeImage}
          pushToast={pushToast}
        />
    }
    {
      method === 'json' &&
      <ImportJSON
        value={json}
        onChange={onJsonChange}
        error={error}
      />
    }
    {
      method === 'clone' &&
        <TemplateSelector
          templates={templates}
          value={selectedTemplateName}
          setTemplate={setTemplate}
          setSelectedTemplateName={setSelectedTemplateName}
        />
    }
    {
      (type === 'clone' || !isNil(template)) &&
        <InfoForm
          error={error}
          setError={setError}
          prototypeInfo={template}
          setPrototypeInfo={setTemplate}
          uploadPrototypeImage={uploadPrototypeImage}
          pushToast={pushToast}
        />
    }
  </DialogWrapper>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withState('method', 'setMethod', 'new'),
  withState('prototypeInfo', 'setPrototypeInfo', {
    prototypeName: '',
    version: '',
    prototypeDescription: '',
    prototypeImageURL: '',
  }),
  withState('template', 'setTemplate', prop('template')),
  withState('selectedTemplateName', 'setSelectedTemplateName', ''),
  withState('error', 'setError', false),
  withState('json', 'setJson', ''),
  withProps((props) => {
    const t = props.getMessages;
    let title;
    if (props.title) {
      title = props.title;
    } else {
      title = props.type === 'new' ? t('createPrototype') : t('clonePrototype');
    }

    return { title };
  }),
  withHandlers({
    onMethodChange: props => (e, value) => {
      props.setMethod(value);
      if (value === 'clone') {
        props.retrievePrototypeTemplates();
      }
    },
    onJsonChange: props => (value) => {
      try {
        props.setJson(JSON.stringify(JSON.parse(value)));
        props.setError(false);
      } catch (error) {
        props.setError(error.message);
      }
      props.setJson(value);
    },
    onConfirm: props => () => {
      if (props.method === 'clone' || props.type === 'clone') {
        if (props.template.prototypeName.length === 0) {
          props.setError(true);
        } else {
          props.onClone(props.template.prototypeId, props.template)
            .then(() => props.pushToast({
              kind: 'success',
              message: props.getMessages('createPrototypeSuccess'),
            }));
          props.onCancel();
        }
      } else if (props.method === 'json') {
        let json;

        try {
          json = JSON.parse(props.json);
        } catch (error) {
          props.setError(error.message);
        }

        props.setError(false);
        props.importJSON('importjson', json)
          .then(() => {
            props.onCancel();
            props.retrievePrototypeList();
            props.pushToast({
              kind: 'success',
              message: props.getMessages('createPrototypeSuccess'),
            });
          })
          .catch(({ response }) => {
            response.json().then(({ schema }) => props.setError(schema[0].message));
          });
      } else if (props.prototypeInfo.prototypeName.length === 0) {
        props.setError(true);
      } else {
        props.onCreate(props.prototypeInfo);
        props.onCancel();
      }
    },
  }),
)(CreatePrototype);
