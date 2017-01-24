import React from 'react';
import PageConstants from '../constants/pageConstants.js';
import AppActions from '../actions/appActions.js';

var Reserpassword = React.createClass({

  getInitialState: function() {
    return {
      token: AppActions.getQuery('token')
    };
  },

  handleSubmit: function() {
    var data = {};

    data.password        = this.refs.password.getDOMNode().value;
    data.againtPassword  = this.refs.againtPassword.getDOMNode().value;
    data.token           = this.state.token;
    data.type            = 'resetKey';

    if (data.password !== data.againtPassword) {
      AppActions.checkPassword('RESETPASSWORD', __('Password does not match confirmation.'));
      return false;
    }

    if (data.password.length < 8) {
      AppActions.checkPassword('RESETPASSWORD', __('Password is too short (minimum 8 characters).'));
      return false;
    }

    AppActions.resetPassword(data);
    return false;
  },

  render: function() {

    return (
      <div className="panel panel--sm panel--main center-block text-center">
        <div className="panel__heading">
          <img className="panel__heading__logo center-block" src="/imgs/logo.png" />
        </div>
        <div className="text--alert" role="alert">
          <span>{ this.props.errorMsg }</span>
        </div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">Change password</span>
          </div>
        </div>
        <form role="form" method="put" onSubmit={ this.handleSubmit }>
          <div className="panel__body">
            <div className="form-group">
              <input
                id="resetpassword-input-password"
                name="password"
                type="password"
                ref="password"
                className="form-control"
                placeholder="At least 8 characters" />
            </div>
            <div className="form-group">
              <input
                id="resetpassword-input-again-password"
                name="againtPassword"
                type="password"
                ref="againtPassword"
                className="form-control"
                placeholder="Input your new password again" />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12">
              <button
                id="resetpassword-submit"
                type="submit"
                className="btn btn-block btn--submit">
                Change password
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
});

export default Reserpassword;
