import React from 'react';
import { Route } from 'react-router';
import App from '../containers/app';
import Prototypes from '../containers/prototypes';
import Dashboard from '../containers/dashboard';
import PrototypeDetail from '../containers/prototypeDetail';
import Devices from '../containers/devices';
import DeviceDetail from '../containers/deviceDetail';
import Signup from '../containers/signup';
import Login from '../containers/login';
import Profile from '../containers/profile';
import CommonLayout from '../containers/commonLayout';
import ImageUploader from '../components/common/imageUploader';

export default (
  <Route component={App}>
    <Route component={CommonLayout}>
      <Route
        path="/"
        components={Dashboard}
      />
      <Route
        path="/dashboard"
        components={Dashboard}
      />
      <Route
        path="/prototypes"
        components={Prototypes}
      />
      <Route
        path="/prototypes/:prototypeId"
        components={PrototypeDetail}
      />
      <Route
        path="/devices"
        components={Devices}
      />
      <Route
        path="/devices/:deviceId"
        components={DeviceDetail}
      />
      <Route
        path="/profile"
        components={Profile}
      />
    </Route>
    <Route
      path="/login"
      components={Login}
    />
    <Route
      path="/signup"
      components={Signup}
    />
    <Route
      path="/imageuploader"
      components={ImageUploader}
    />
  </Route>
);
