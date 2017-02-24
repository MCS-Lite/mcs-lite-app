import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';

import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import styles from './styles.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const BreadcrumbLayout = ({ deviceName }) => {
  const breadcrumbs = [
    {
      children: <FormattedMessage
        id="DeviceDetail.Breadcrumb.Dashboard"
        defaultMessage="儀表板"
      />,
      href: '/dashboard',
    },
    {
      children: <FormattedMessage
          id="DeviceDetail.Breadcrumb.Devices"
          defaultMessage="測試裝置"
        />,
      href: '/devices'
    },
    { children: deviceName, href: '/devices', active: true },
  ];

  return (
    <div className={styles.base}>
      <Breadcrumb items={breadcrumbs} />
    </div>
  );
}

export default compose(
  pure,
)(BreadcrumbLayout);
