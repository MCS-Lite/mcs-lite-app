import React, { Component } from 'react';
import Main from '../containers/main';

class App extends Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        { children }
      </div>

    );
  }
}

export default App