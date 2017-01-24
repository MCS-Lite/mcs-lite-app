import React from 'react';
import PageConstants from '../constants/pageConstants.js';
import AppActions from '../actions/appActions.js';

var Forgetpassword = React.createClass({

  handleSubmit: function() {
    var data = {};

    data.email = this.refs.email.getDOMNode().value;

    AppActions.forgetPassword(data);
    return false;

  },

  render: function() {

    return (
      <div className="panel panel--sm panel--main center-block text-center">
        <div className="panel__heading">
          <img
            className="panel__heading__logo center-block"
            src="/imgs/logo.png" />
        </div>
        <div id="errorMsg" className="text--alert" role="alert">
          <span>{ this.props.errorMsg }</span>
        </div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">{__('Forgot password')}</span>
          </div>
        </div>
        <div className="panel__body text-left">
          <span className="text--tip">
            {__('Please enter your email address and we will send you instructions to reset your password.')}
          </span>
        </div>
        <form role="form" onSubmit={ this.handleSubmit }>
          <div>
              <div className="form-group">
                <input
                  id="forgetpassword-input-email"
                  name="email"
                  type="email"
                  ref="email"
                  className="form-control"
                  placeholder={__('Email address')}
                  required />
              </div>
          </div>
          <div className="row row__botton">
            <div className="col-md-6">
              <a className="btn btn-block btn--cancel" href="./login">{__('Cancel')}</a>
            </div>
            <div className="col-md-6">
              <button
                id="forgetpassword-summit"
                type="submit"
                className="btn btn-block btn--submit">
                {__('Send email')}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

export default Forgetpassword;
