import React from 'react';
import PageConstants from '../constants/pageConstants.js';

var initNum = 5;
var Waiting = React.createClass({

  getInitialState: function() {
    return {
      count: initNum
    };
  },

  counting: function(){
    window.setTimeout(
      function() {
        if (this.state.count === 0) {
          clearTimeout(this.componentDidMount());
          if (window.location.pathname.split('/').length === 4) {
            window.location.replace('/oauth/' + window.location.pathname.split('/')[2] + '/login');
          } else {
            window.location.replace('/oauth/login');
          }
        } else {
          initNum = initNum - 1;
          this.setState({ count: initNum });
          return this.componentDidMount();
        }
      }.bind(this),
    1000);
  },

  componentDidMount: function() {
    this.counting();
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
        <div id="errorMsg" className="text--success" role="alert" >
          <span id="waiting">{__('Back to login page in ') + this.state.count + __(' sec.')}</span>
        </div>
        <div className="panel__body">
          <div className="hr">
            <span className="hr__text">{__('Success')}</span>
          </div>
        </div>
        { this.props.successMsg }
      </div>
    );
  }
});

export default Waiting;
