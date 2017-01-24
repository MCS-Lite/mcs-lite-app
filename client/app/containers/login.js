import { connect } from 'react-redux';
import React, { Component } from 'react'
import login from './login/login.css';
import logo from './login/logo.png';

import InputText from 'mtk-ui/lib/InputText';
import InputForm from 'mtk-ui/lib/InputForm';
import InputCheckbox from 'mtk-ui/lib/InputCheckbox';
import Button from 'mtk-ui/lib/Button';
import Hr from 'mtk-ui/lib/Hr';

import Footer from '../components/footer';

class Login extends Component {
  render() {
    return (
      <div>
        <div className={login.base}>
          <form
            className={login.form}
            id="loginSubmit"
            role="form"
            action="http://127.0.0.1:3000/auth/login"
            method="post"
          >
            <img src={logo} className={login.logo}/>
            <Hr className={login.hr}>Welcome</Hr>
            <InputText name="email" type="email" onChange={this.onChangeEmail} placeholder="Email address" className={login.input}/>
            <InputText name="password" type="password" placeholder="Password" onChange={this.onChangePassword} />
            <br />
            <InputCheckbox label="Remember me" />
            <Button type="submit" className={login.submit}>
              Sign In
            </Button>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}

const mapDispatchToProps = (dispatch) => {
  return {};
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);