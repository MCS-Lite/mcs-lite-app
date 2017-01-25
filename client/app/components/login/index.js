import { connect } from 'react-redux';
import React, { Component } from 'react';
import LoginStyle from './login.css';
import logo from './logo.png';

import InputText from 'mtk-ui/lib/InputText';
import InputForm from 'mtk-ui/lib/InputForm';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';
import Footer from '../footer';

const Login = ({ login }) => {
  return (
    <div>
      <div className={LoginStyle.base}>
        <form
          className={LoginStyle.form}
          id="loginSubmit"
          role="form"
          action="http://127.0.0.1:3000/auth/login"
          method="post"
        >
          <img src={logo} className={LoginStyle.logo}/>
          {login.errorMsg}
          <Hr className={LoginStyle.hr}>Welcome</Hr>
          <InputText name="email" type="email" placeholder="Email address" className={LoginStyle.input}/>
          <InputText name="password" type="password" placeholder="Password" />
          <br />
          <InputCheckbox label="Remember me" />
          <Button type="submit" className={LoginStyle.submit}>
            Sign In
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Login;