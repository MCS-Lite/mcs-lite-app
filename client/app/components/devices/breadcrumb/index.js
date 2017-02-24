import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import styles from './styles.css';

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
    <div className={styles.base}>
      <Breadcrumb items={Breadcrumbs} />
    </div>
  );
}

export default BreadcrumbLayout;
