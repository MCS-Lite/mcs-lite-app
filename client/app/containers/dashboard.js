import { connect } from 'react-redux';
import React, { Component } from 'react';
import DashboardLayout from '../components/dashboard';
import * as dashboardActions from '../actions/DashboardActions';
import * as prototypeActions from '../actions/PrototypeActions';


class Dashboard extends Component {
  componentDidMount() {
    this.props.retrieveDashboard()
  }

  render() {
    return (
      <DashboardLayout {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps, { ...dashboardActions, ...prototypeActions })(Dashboard)