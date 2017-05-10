import React from 'react';
import { compose, pure } from 'recompose';
import { connect } from 'react-redux';
import Header from '../components/header';
import Footer from '../components/footer';
import { signOut as signOutAction } from '../actions/appActions';

const CommonLayout = ({ children, main, location: { pathname }, signOut }) => (
  <div>
    <Header
      imageUrl={main.userImage}
      pathname={pathname}
      signOut={signOut}
    />
    {children}
    <Footer />
  </div>
);

export default compose(
  pure,
  connect(({ main }) => ({ main }), { signOut: signOutAction }),
)(CommonLayout);
