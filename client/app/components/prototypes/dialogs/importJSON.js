import React, { Component } from 'react';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import messages from '../messages';
import { withGetMessages } from 'react-intl-inject-hoc';

import prototypeStyles from '../prototypes.css';
import CodeBlock from 'mtk-ui/lib/CodeBlock';

const ImportJSONLayout = ({
  getMessages: t,
}) => {
  return (
    <div>
      {t('uploadJSONhint')} <a className={prototypeStyles.link}>{t('browseAndUpload')}</a>
      <CodeBlock />
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'Prototypes'),
)(ImportJSONLayout)