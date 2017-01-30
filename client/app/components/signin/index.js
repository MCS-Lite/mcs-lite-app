import React, { Component } from 'react';

import LoginStyles from '../login/login.css'
import SigninStyles from './signin.css'

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

import { browserHistory } from 'react-router';
import logo from '../login/logo.png';

const Signin = ({ signin, openLogin }) => {
  return (
    <div>
      <div className={LoginStyles.base}>
        <form
          className={LoginStyles.form}
          id="signinSubmit"
          role="form"
          action={ window.oauthUrl + "/signin" }
          method="post"
        >
          <img src={logo} className={LoginStyles.logo}/>
          {signin.errorMsg}
          <Hr className={LoginStyles.hr}>Create an account</Hr>
          <InputText name="userName" type="text" placeholder="Nick name" className={LoginStyles.input} />
          <InputText name="email" type="email" placeholder="Email address" className={LoginStyles.input} />
          <InputText name="password" type="password" placeholder="Password" className={LoginStyles.input} />
          <InputText name="passwordAgain" type="password" placeholder="Confirm your password" className={LoginStyles.input} />
          <InputCheckbox label="I agree" required /> <a className={SigninStyles.termofuseLink}> Terms of Service and Privacy Policy. </a>
          <div className={SigninStyles.submit}>
          <Button kind="cancel" onClick={openLogin} className={SigninStyles.submitBtn}>
            Cancel
          </Button>
          <Button type="submit" className={SigninStyles.submitBtn}>
            Submit
          </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default compose(
  pure,
  withState('isOpenTermOfUse', 'setIsOpenTermOfUse', false),
  withHandlers({
    openTermOfUse: props => () => props.setIsOpenTermOfUse(!props.isOpenTermOfUse),
    openLogin: props => () => browserHistory.push('/login'),
  }),
)(Signin);