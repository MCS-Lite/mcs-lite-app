import { connect } from 'react-redux';
import React, { Component } from 'react';
import { checkToken, checkLocale, checkLocalStorage } from '../actions/appActions';
import ToastCenter from '../containers/toastCenter';

class App extends Component {
  componentWillMount() {
    const { checkToken: doCheckToken, location } = this.props;
    
    if (!/(login)|(signup)/.test(location.pathname)) {
      return doCheckToken();
    }
    return checkLocalStorage();    
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
