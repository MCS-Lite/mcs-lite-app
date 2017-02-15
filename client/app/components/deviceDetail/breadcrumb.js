import React, { Component } from 'react';
import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import breadcrumbStyles from './breadcrumb.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const BreadcrumbLayout = ({ deviceName }) => {
  const Breadcrumbs = [
    { children: 'Development' },
    { children: 'Devices', href: '/devices' },
    { children: deviceName, href: '/devices', active: true },
  ];

  return (
    <div className={breadcrumbStyles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default compose(
  pure,
)(BreadcrumbLayout);