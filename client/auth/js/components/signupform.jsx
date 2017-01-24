import React from 'react';
import AppActions from '../actions/appActions.js';
import PageConstants from '../constants/pageConstants.js';
import {jstz} from '../jstz.js';

var SignUpForm = React.createClass({

  getInitialState() {
    var timezone = jstz.determine().name();
    return { timezone: timezone };
  },

  componentDidMount() {
    if (localStorage.newAccount) {
      var newAccount = JSON.parse(localStorage.newAccount);
      this.setState({
        email: newAccount.email,
        nickname: newAccount.nickname,
        password: newAccount.password,
        againtPassword: newAccount.againtPassword
      });
    }
  },

  handleNickNameChange: function(event) {
    this.setState({nickname: event.target.value});
  },

  handleEmailChange: function(event) {
    this.setState({email: event.target.value});
  },

  handlePasswordChange: function(event) {
    this.setState({password: event.target.value});
  },

  handleAgaintPasswordChange: function(event) {
    this.setState({againtPassword: event.target.value});
  },

  handleSubmit: function() {
    var data = {};
    data.email           = this.state.email;
    data.nickname        = this.state.nickname;
    data.password        = this.state.password;
    data.againtPassword  = this.state.againtPassword;
    data.timezone        = this.state.timezone;
    if (data.password !== data.againtPassword) {
      AppActions.checkPassword('SIGNUP', __('Password does not match confirmation.'));
      return false;
    }

    if (data.password.length < 8) {
      AppActions.checkPassword('SIGNUP', __('Password is too short (minimum 8 characters).'));
      return false;
    }

    AppActions.signUp(data);
    return false;

  },

  goPolicy: function() {
    var newAccount = {
      email: this.state.email,
      nickname: this.state.nickname,
      password: this.state.password,
      againtPassword: this.state.againtPassword,
      timezone: this.state.timezone
    };
    localStorage.newAccount = JSON.stringify(newAccount);
    AppActions.changePage(PageConstants.TERMSOFUSE);
  },

  render: function() {
    return (
      <div className="panel panel--sm panel--main center-block text-center">
        <div className="panel__heading">
          <img
            className="panel__heading__logo center-block"
            src="/imgs/logo.png" />
        </div>
        <div
          className="text--alert"
          role="alert">{ this.props.errorMsg }</div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">{__('Create an account')}</span>
          </div>
        </div>
        <form id="signupSubmit" onSubmit={ this.handleSubmit }>
          <div>
            <div className="form-group">
              <input
                id="signup-input-nickname"
                name="nickname"
                type="text"
                className="form-control"
                onChange={this.handleNickNameChange}
                value={this.state.nickname}
                placeholder={__('Nick name')}
                required />
            </div>
            <div className="form-group">
              <input
                id="signup-input-email"
                name="email"
                type="email"
                onChange={this.handleEmailChange}
                value={this.state.email}
                className="form-control"
                placeholder={__('Email')}
                required />
              <input
                id="signup-input-timezone"
                type="hidden"
                className="form-control"
                name="timezone"
                value={ this.state.timezone } />
            </div>
            <div className="form-group">
              <input
                id="signup-input-password"
                name="password"
                type="password"
                onChange={this.handlePasswordChange}
                value={this.state.password}
                className="form-control"
                placeholder={__('Password')}
                required />
            </div>
            <div className="form-group">
              <input
                id="signup-input-againt-password"
                type="password"
                name="againtPassword"
                value={this.state.againtPassword}
                onChange={this.handleAgaintPasswordChange}
                className="form-control"
                placeholder={__('Confirm your password')}
                required />
            </div>
            <div className="checkbox text-left">
              <label style={{ lineHeight: '1.6em'}}>
                <input
                  id="signup-input-agree"
                  className="checkbox__input"
                  type="checkbox"
                  required/>
                <span className="text--tip">{__('I agree ')}</span>
                <a
                  id="signup-termsofuse"
                  className="text--tip text--link"
                  onClick={ this.goPolicy }>{__('Terms of Service and Privacy Policy.')}</a>
              </label>
            </div>
          </div>
          <div className="row" style={{ marginTop: '32px' }}>
            <div className="col-xs-6">
              <a
                id="signup-cancel"
                className="btn btn-block btn--cancel"
                href="./login"
                onclick="_gaq.push(['_trackEvent','SignupPage','Action','cancel']);">{__('Cancel')}</a>
            </div>
            <div className="col-xs-6">
              <button
                id="signup-submit"
                type="submit"
                className="btn btn-block btn--submit"
                >{__('Submit')}</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

export default SignUpForm;
