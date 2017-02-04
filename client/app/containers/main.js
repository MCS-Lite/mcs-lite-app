import { connect } from 'react-redux';

import React, { Component } from 'react'
import main from './main.css';

class Main extends Component {
  render() {
    return (
      <div className={main.base}>
        this is main app.
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {})(Main);