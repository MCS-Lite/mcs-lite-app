import React from 'react';
import PageConstants from '../constants/pageConstants.js';
import AppActions from '../actions/appActions.js';
// import labsLogo from '../../imgs/logo_labs_signin.png';
// import csipLogo from '../../imgs/logo_network_studio_signin.png.png';

var Login = React.createClass({
  getInitialState: function() {
    return {
      _csrf: AppActions.getCookie('_csrf'),
      errorMsg: this.props.errorMsg,
      successMsg: this.props.successMsg
    };
  },

  goSignUp: function() {
    AppActions.changePage(PageConstants.SIGNUP);
  },

  goForgetPassword: function() {
    AppActions.changePage(PageConstants.FORGETPASSWORD);
  },

  render: function() {

    var errorContent =
      <div id="errorMsg" className="text--alert" role="alert">
        <span>{ this.props.errorMsg }</span>
      </div>;

    var errorElem = (this.props.errorMsg != null) ? errorContent : '';
    var labsLogin;
    if (/cn/.test(window.location.host)) {
      var client_id = 'sandbox_cn';
      if (/staging\-mcs/.test(window.location.host)) {
        labsLogin =
          <div>
            <div className="panel__body">
              <div className="hr">
                <span className="hr__text">{__('Or sign in with')}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <a
                  className="btn btn-block btn--other"
                  style={{/* bg: */
                    background: '#FAFAFA',
                    border: '1px solid #D1D2D3',
                    borderRadius: '3px',
                  }}
                  href={ window.mediatekLab + '/oauth/authorize?response_type=code&client_id=' + client_id + '&scope=user_read'}
                  onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'signin(labs)']);"><img style={{ width: '100px', marginTop: '2px', marginLeft: '-2px' }} src="/imgs/logo_labs_signin.png" /></a>
              </div>
              <div className="col-md-6">
                <a
                  style={{/* bg: */
                    background: '#FAFAFA',
                    border: '1px solid #D1D2D3',
                    borderRadius: '3px',
                  }}
                  className="btn btn-block btn--other"
                  href="//ns.csip.cn/mediatek.php?callback=http://staging-mcs.mediatek.cn/oauth/csip/callback"
                  onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'signin(csip)']);"><img style={{ width: '57px' }} src="/imgs/logo_network_studio_signin.png" /></a>
              </div>
            </div>
          </div>;
      } else {
        labsLogin =
        <div>
          <div className="panel__body">
            <div className="hr">
              <span className="hr__text">{__('Or sign in with')}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <a
                className="btn btn-block btn--other"
                style={{/* bg: */
                  background: '#FAFAFA',
                  border: '1px solid #D1D2D3',
                  borderRadius: '3px',
                }}
                href={ window.mediatekLab + '/oauth/authorize?response_type=code&client_id=' + client_id + '&scope=user_read'}
                onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'signin(labs)']);"><img style={{ width: '100px', marginTop: '2px', marginLeft: '-2px' }} src="/imgs/logo_labs_signin.png" /></a>
            </div>
            <div className="col-md-6">
              <a
                style={{/* bg: */
                  background: '#FAFAFA',
                  border: '1px solid #D1D2D3',
                  borderRadius: '3px',
                }}
                className="btn btn-block btn--other"
                href="http://ns.csip.cn/mediatek.php?callback=http://mcs.mediatek.cn/oauth/csip/callback"
                onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'signin(csip)']);"><img style={{ width: '57px' }} src="/imgs/logo_network_studio_signin.png" /></a>
            </div>
          </div>
        </div>;
      }

    } else {
      var client_id = 'sandbox';
      labsLogin =
        <div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">{__('Or sign in with')}</span>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <a
              id="login-login-labs"
              className="btn btn-block btn--other"
              href={ window.mediatekLab + '/oauth/authorize?response_type=code&client_id=' + client_id + '&scope=user_read'}
              onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'signin(labs)']);">Labs@mediatek.com</a>
          </div>
        </div>
      </div>;
    }
    return (
      <div className="panel panel--sm panel--main center-block text-center">
        <div className="panel__heading">
          <img
            className="panel__heading__logo center-block"
            src="/imgs/logo.png" />
        </div>
        { errorElem }
        <div>
          <div className="panel__body">
            <div className="hr">
              <span className="hr__text">{__('Welcome')}</span>
            </div>
          </div>
          <form
            id="loginSubmit"
            role="form"
            action="./login"
            method="post"
            >
            <div className="panel__body">
              <div className="form-group">
                <input
                  id="login-input-email"
                  name="email"
                  type="email"
                  className="form-control"
                  ref="email"
                  placeholder={__('Email address')}
                  required/>
              </div>
              <div className="form-group">
                <input
                  id="login-input-password"
                  name="password"
                  type="password"
                  ref="password"
                  className="form-control"
                  placeholder={__('Password')}
                  required/>
                <input
                  name="_csrf"
                  type="hidden"
                  value={this.state._csrf}/>
              </div>
              <div className="row text-left checkbox">
                <div className="col-md-6 form__signup__left">
                  <label>
                    <input
                      className="checkbox__input"
                      type="checkbox" />
                    <span className="text--tip" style={{ lineHeight: '1.9em'}}>{__('Remember me')}</span>
                  </label>
                </div>
                <div
                  className="col-md-6 form__signup__right"
                  style={{ paddingTop: '2px' }}>
                  <a
                    className="text--tip text--link pull-right"
                    id="login-forgetpassword"
                    href="./forgetpassword"
                    onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'forgot password']);">{__('Forgot password')}?</a>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <button
                  id="login-login-mcs"
                  type="submit"
                  className="btn btn-block btn--submit"
                >
                  {__('Sign in')}
                </button>
              </div>
            </div>
            <div className="row form__signup text-left">
              <div className="col-sm-6 text--tip form__signup__left">{__('Do not have account')}?</div>
              <div className="col-sm-6 form__signup__right">
                <a
                  id="login-signup"
                  className="text--tip text--link pull-right"
                  href="./signup"
                  onclick="_gaq.push(['_trackEvent', 'SigninPage', 'Action', 'create an account']);" >{__('Create an account')}!</a>
              </div>
            </div>
            {labsLogin}
          </form>
        </div>
      </div>
    );
  }
});

export default Login;
