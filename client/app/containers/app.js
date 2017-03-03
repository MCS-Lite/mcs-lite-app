import { connect } from 'react-redux';
import React, { Component } from 'react';
import { checkToken } from '../actions/AppActions';
import ToastCenter from '../containers/ToastCenter';

class App extends Component {
  componentWillMount() {
    const { checkToken, location } = this.props;
    if (!/(login)|(signin)/.test(location.pathname)) {
      checkToken();
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
          /(login)|(signin)/.test(location.pathname)
          ? children : (main.isInitialized && children)
        }
        <ToastCenter />
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { checkToken })(App);
