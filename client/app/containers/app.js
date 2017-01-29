import { connect } from 'react-redux';
import React, { Component } from 'react';
import Main from '../containers/main';
import { checkToken } from '../actions/AppActions';

class App extends Component {
  componentWillMount() {
    console.log(7777)
    this.props.checkToken();
  }

  render() {
    const { children, location, main } = this.props;
    return (
      <div>
        { location.pathname === '/login' ?
          children : (main.isInitialized && children)
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { checkToken })(App);
