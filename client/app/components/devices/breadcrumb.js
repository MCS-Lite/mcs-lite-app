import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Footer from '../footer';
import Header from '@mtk/mcs-components/lib/Header';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import breadcrumbStyles from './breadcrumb.css';

const Breadcrumbs = [
  {
    children: <FormattedMessage
      id="Devices.Dashboard"
      defaultMessage="儀表板"
    />,
    href: '/dashboard',
  },
  {
    children: <FormattedMessage
      id="Devices.TestDevices"
      defaultMessage="測試裝置列表"
    />,
    href: '/devices',
    active: true,
  },
];

const BreadcrumbLayout = () => {
  return (
    <div className={breadcrumbStyles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default BreadcrumbLayout;
