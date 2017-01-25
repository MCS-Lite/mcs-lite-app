import { connect } from 'react-redux';
import React, { Component } from 'react';
import Main from '../containers/main';
import { checkToken } from '../actions/AppActions';

class App extends Component {
  componentWillMount() {
    this.props.checkToken();
  }

  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { checkToken })(App);
