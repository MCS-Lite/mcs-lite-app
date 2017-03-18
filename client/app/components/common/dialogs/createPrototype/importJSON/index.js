import React from 'react';
import { compose, pure, withProps } from 'recompose';
import CodeMirror from 'react-codemirror';
import c from 'classnames';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/javascript/javascript';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';
import UploadJSONLink from './uploadJSONLink';

import styles from './styles.css';

const ImportJSONLayout = ({
  value,
  onChange,
  error,
  codeMirrorOptions,
  getMessages: t,
}) => (
  <div>
    {t('uploadJSONhint')}
    <UploadJSONLink onChange={onChange} />
    <CodeMirror
      value={value}
      onChange={onChange}
      options={codeMirrorOptions}
      className={c(
        styles.codeBlock,
        value.length === 0 && styles.codeBlockPlaceholder,
        error && styles.codeBlockError,
      )}
    />
    <div className={styles.errorMessage}>{error}</div>
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
  withProps(({ getMessages: t }) => ({
    codeMirrorOptions: {
      lineNumbers: true,
      placeholder: t('codeBlockPlaceholder'),
      mode: 'javascript',
    },
  })),
)(ImportJSONLayout);
