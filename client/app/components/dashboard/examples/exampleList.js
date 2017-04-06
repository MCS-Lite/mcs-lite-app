import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

import Button from 'mtk-ui/lib/Button';

import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withHandlers from 'recompose/withHandlers';
import pure from 'recompose/pure';

import { withGetMessages } from 'react-intl-inject-hoc';
import defaultBanner from 'images/banner.svg';
import messages from '../messages';
import CreatePrototype from '../../common/dialogs/createPrototype';

import styles from './styles.css';

const ExampleListLayout = ({
  getMessages: t,
  prototype,
  isCreatePrototype,
  onCloneClick,
  onClone,
  onCancel,
  uploadPrototypeImage,
  pushToast,
}) => (
  <div key={prototype.prototypeId} className={styles.exampleList}>
    <img
      src={
        prototype.prototypeImageURL
        ? window.apiUrl.replace('api', 'images/') + prototype.prototypeImageURL
        : defaultBanner
      }
      className={styles.prototypeImg}
      alt="banner"
    />
    <div className={styles.cell}>
      <span>{t('prototypeName')}</span>
      <Link
        to={`/prototypes/${prototype.prototypeId}`}
        className={styles.link}
      >
        {prototype.prototypeName}
      </Link>
    </div>
    <div className={styles.cell}>
      <span>{t('lastUpdateTime')}</span>
      {moment(prototype.updatedAt).format('YYYY-MM-DD hh:mm')}
    </div>
    <div className={styles.cell}>
      <Button onClick={onCloneClick}>
        {t('clonePrototype')}
      </Button>
    </div>
    {
      isCreatePrototype &&
      <CreatePrototype
        type="clone"
        template={prototype}
        onClone={onClone}
        onCancel={onCancel}
        uploadPrototypeImage={uploadPrototypeImage}
        pushToast={pushToast}
      />
    }
  </div>
);

export default compose(
  pure,
  withState('isCreatePrototype', 'setIsCreatePrototype', false),
  withHandlers({
    onCloneClick: props => () => props.setIsCreatePrototype(true),
    onClone: props => (id, data) => props.clonePrototype(id, data)
      .then(() => props.retrieveDashboard()),
    onCancel: props => () => props.setIsCreatePrototype(false),
  }),
  withGetMessages(messages, 'Dashboard'),
)(ExampleListLayout);
