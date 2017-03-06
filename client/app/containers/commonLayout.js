import React from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';

const CommonLayout = ({ children, main, location: { pathname }}) => (
  <div>
    <Header
      imageUrl={main.userImage}
      pathname={pathname}
    />
    {children}
    <Footer />
  </div>
);

export default compose(
  pure,
  connect(({ main }) => ({ main })),
)(CommonLayout);
