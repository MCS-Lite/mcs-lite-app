import React, { Component } from 'react';

import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import styles from './styles.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

import messages from '../messages';
import { withGetMessages } from 'react-intl-inject-hoc';

const BreadcrumbLayout = ({
  getMessages: t,
}) => {
  const Breadcrumbs = [
    { children: t('development') },
    { children: t('prototype'), href: '/prototypes', active: true },
  ];

  return (
    <div className={styles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'Prototypes'),
)(BreadcrumbLayout);