import { connect } from 'react-redux';
import React, { Component } from 'react'
import main from './main.css';

class Admin extends Component {
  render() {
    return (
      <div>
        <div>
          this is admin page!
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, {})(admin);