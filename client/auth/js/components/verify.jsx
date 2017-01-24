import React from 'react';
import AppActions from '../actions/appActions.js';
import PageConstants from '../constants/pageConstants.js';

var Verify = React.createClass({

  getInitialState: function() {
    return {
      email: AppActions.getQuery('email')
    };
  },

  goSendVerifyEmail: function() {
    AppActions.sendVerifyEmail(this.state.email);
  },

  render: function() {
    return (
      <div
        className="panel panel--sm panel--main center-block text-center">
        <div className="panel__heading">
          <img
            className="panel__heading__logo center-block"
            src="/imgs/logo.png"/>
        </div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">{__('Activate your account.')}</span>
          </div>
        </div>
        <p className="text-justify">{__('Your account is not activated yet. Please click on the mail verification link to activate your account.')}</p>
        <div className="row" style={{ marginTop: '32px' }}>
          <div className="col-xs-6">
            <a
              className="btn btn-block btn--cancel"
              href="./login"
              onclick="_gaq.push(['_trackEvent','SignupPage','Action','cancel']);">{__('Cancel')}</a>
          </div>
          <div className="col-xs-6">
            <button
              type="submit"
              onClick={this.goSendVerifyEmail}
              className="btn btn-block btn--submit"
              >{__('Send email again')}</button>
          </div>
        </div>
      </div>
    );
  }
});

export default Verify;
