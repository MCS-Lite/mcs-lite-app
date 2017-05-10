import { connect } from 'react-redux';
import React, { Component } from 'react';
import { compose, withState } from 'recompose';
import DashboardLayout from '../components/dashboard';
import LoadingPage from '../components/common/loadingPage';
import * as dashboardActions from '../actions/dashboardActions';
import * as prototypeActions from '../actions/prototypeActions';
import * as toastActions from '../actions/toastActions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.retrieveDashboard()
    .then(() => this.props.setIsInitialized(true));
  }

  render() {
    return (
      <div>
        { this.props.isInitialized ? <DashboardLayout {...this.props} /> : <LoadingPage /> }
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default compose(
  connect(mapStateToProps, { ...dashboardActions, ...prototypeActions, ...toastActions }),
  withState('isInitialized', 'setIsInitialized', false),
)(Dashboard);
