import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DashboardLayout from '../components/dashboard';
import * as dashboardActions from '../actions/DashboardActions';
import * as prototypeActions from '../actions/PrototypeActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.retrieveDashboard()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized && <DashboardLayout {...this.props} /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, { ...dashboardActions, ...prototypeActions }),
  withState('isInitialized', 'setIsInitialized', false),
)(Dashboard);
