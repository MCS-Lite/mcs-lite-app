import { connect } from 'react-redux';

import { browserHistory } from 'react-router';

import React, { Component } from 'react';
import LoginStyles from './login.css';
import logo from './logo.png';

import InputText from 'mtk-ui/lib/InputText';
import InputForm from 'mtk-ui/lib/InputForm';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import Footer from '../footer';

import { default as compose } from 'recompose/compose';
import { default as pure } from 'recompose/pure';
import { default as withState } from 'recompose/withState';
import { default as withHandlers } from 'recompose/withHandlers';

const Login = ({ login, openSignIn }) => {
  return (
    <div>
      <div className={LoginStyles.base}>
        <form
          className={LoginStyles.form}
          id="loginSubmit"
          role="form"
          action={ window.oauthUrl + "/login" }
          method="post"
        >
          <img src={logo} className={LoginStyles.logo}/>
          {login.errorMsg}
          <Hr className={LoginStyles.hr}>Welcome</Hr>
          <InputText name="email" type="email" placeholder="Email address" className={LoginStyles.input}/>
          <InputText name="password" type="password" placeholder="Password" />
          <br />
          <InputCheckbox label="Remember me" />
          <Button type="submit" className={LoginStyles.submit}>
            Sign In
          </Button>
          <div className={LoginStyles.createaccount}>
          <p>Do not have account?</p>
          <a onClick={openSignIn}>Create an account.</a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default compose(
  pure,
  withHandlers({
    openSignIn: props => () => browserHistory.push('/signin'),
  }),
)(Login);