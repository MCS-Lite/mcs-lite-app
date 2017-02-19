import React, { Component } from 'react';
import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import breadcrumbStyles from './breadcrumb.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

import withGetMessages from '../../utils/withGetMessage';
import messages from './messages';

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
    <div className={breadcrumbStyles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default compose(
  pure,
  withGetMessages(messages, 'PrototypeDetail'),
)(BreadcrumbLayout);