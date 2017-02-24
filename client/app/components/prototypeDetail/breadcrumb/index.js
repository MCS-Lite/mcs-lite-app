import React, { Component } from 'react';

import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import styles from './styles.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { withGetMessages } from 'react-intl-inject-hoc';
import messages from '../messages';

const BreadcrumbLayout = ({
  prototypeName,
  getMessages: t,
 }) => {

  const Breadcrumbs = [
    { children: t('dashboard') },
    { children: t('prototype'), href: '/prototypes' },
    { children: prototypeName, href: '/prototypes', active: true },
  ];

  return (
    <div className={styles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
)(BreadcrumbLayout);