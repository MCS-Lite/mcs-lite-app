import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import Button from 'mtk-ui/lib/Button';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import pure from 'recompose/pure';

import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';
import productBanner from '../../prototypes/productBanner.png';
import CreateNewPrototype from '../../common/dialogs/createNewPrototype';

import styles from './styles.css';

const ExampleListLayout = ({
  getMessages: t,
  prototype,
  isCreatePrototype,
  setIsCreatePrototype,
  templates,
  createNewPrototype,
  onCloneClick,
}) => (
  <div key={prototype.prototypeId} className={styles.exampleList}>
    <img
      src={productBanner}
      className={styles.prototypeImg}
      alt="banner"
    />
    <div className={styles.cell}>
      {t('prototypeName')}
      <Link
        to={`/prototypes/${prototype.prototypeId}`}
        className={styles.link}
      >
        {prototype.prototypeName}
      </Link>
    </div>
    <div className={styles.cell}>
      <span>{t('lastUpdateTime')}</span>
      {moment(prototype.updatedAt).format('YYYY-MM-DD h:mm')}
    </div>
    <div className={styles.cell}>
      <Button onClick={onCloneClick}>
        {t('clonePrototype')}
      </Button>
    </div>
    {
      isCreatePrototype &&
      <CreateNewPrototype
        createNewPrototype={createNewPrototype}
        isCreatePrototype
        setIsCreatePrototype={setIsCreatePrototype}
        prototypeTemplates={templates}
        isDashboard
        defaultPrototype={prototype}
      />
    }
  </div>
);

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withHandlers({
    onCloneClick: props => () => props.setIsCreatePrototype(true),
  }),
  withGetMessages(messages, 'Dashboard'),
)(ExampleListLayout);
