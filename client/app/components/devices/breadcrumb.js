import React, { Component } from 'react';
import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import breadcrumbStyles from './breadcrumb.css';

const Breadcrumbs = [
  { children: 'Development' },
  { children: 'Test devices', href: '/devices', active: true },
];

const BreadcrumbLayout = () => {
  return (
    <div className={breadcrumbStyles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default BreadcrumbLayout;