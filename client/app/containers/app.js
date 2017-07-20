import { connect } from 'react-redux';
import React, { Component } from 'react';
import { checkToken, checkLocale } from '../actions/appActions';
import ToastCenter from '../containers/toastCenter';
import { query } from '../utils/url';

const qs = query(window.location.search.substr(1).split('&'));

class App extends Component {
  componentWillMount() {
    const { checkToken: doCheckToken, location } = this.props;
    if (!/(login)|(signup)/.test(location.pathname)) {
      doCheckToken();
    } else {
      if (!/locale\=/.test(window.location.search)) {
        let language;

        if (localStorage.getItem('locale')) {
          language = localStorage.getItem('locale');
        } else {
          language = navigator.languages ? navigator.languages[0] : (navigator.language || navigator.userLanguage);
          localStorage.setItem('locale', language);
          if (/^en/.test(language)) language = 'en';
        }

        if (!/^(en|zh-tw|zh-cn)$/.test(language.toLowerCase())) language = 'en';

        if (!/\?/.test(window.location.href)) {
          window.location.href += '?locale=' + language;
        } else {
          window.location.href += '&locale=' + language;
        }
      } else {
        localStorage.setItem('locale', qs['locale']);
      }
    }
  }

  render() {
    const {
      children,
      location,
      main,
    } = this.props;

    return (
      <div>
        {
          /(login)|(signup)/.test(location.pathname)
          ? children : (main.isInitialized && children)
        }
        <ToastCenter />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { checkToken })(App);
