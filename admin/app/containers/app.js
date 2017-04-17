import { connect } from 'react-redux';
import React, { Component } from 'react';
import styles from './styles.css';

class App extends Component {
  render() {
    return (
      <div className={styles.base}>
        123123123
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, { })(App);
