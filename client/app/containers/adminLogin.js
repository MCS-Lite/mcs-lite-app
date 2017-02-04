import { connect } from 'react-redux';
import React, { Component } from 'react'
import main from './main.css';

class AdminLogin extends Component {
  render() {
    return (
      <div>
        <div className={main.base}>
          this is admin login!
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {})(AdminLogin);