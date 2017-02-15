import React, { Component } from 'react';
import Breadcrumb from 'mtk-ui/lib/Breadcrumb';
import BreadcrumbItem from 'mtk-ui/lib/BreadcrumbItem';

import breadcrumbStyles from './breadcrumb.css';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';

const BreadcrumbLayout = ({ deviceName }) => {
  const Breadcrumbs = [
    { children: 'Development' },
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