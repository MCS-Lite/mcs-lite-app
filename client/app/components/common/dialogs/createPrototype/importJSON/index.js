import React from 'react';
import { compose, pure } from 'recompose';
import CodeBlock from 'mtk-ui/lib/CodeBlock';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../../messages';

import styles from './styles.css';

const ImportJSONLayout = ({
  getMessages: t,
}) => (
  <div>
    {t('uploadJSONhint')}
    <a className={styles.link}>
      {t('browseAndUpload')}
    </a>
    <CodeBlock />
  </div>
);

export default compose(
  pure,
  withGetMessages(messages, 'Dialogs'),
)(ImportJSONLayout);
