import React from 'react'
import { Route } from 'react-router'
import App from '../containers/app'
import Prototypes from '../containers/prototypes'
import PrototypeDetail from '../containers/prototypeDetail'
import Devices from '../containers/devices'
import DeviceDetail from '../containers/deviceDetail'
import Signin from '../containers/signin'
import Login from '../containers/login'

export default (
  <Route component={App}>
    <Route
      path="/"
      components={Prototypes} />
    <Route
      path="/login"
      components={Login} />
    <Route
      path="/signin"
      components={Signin} />
    <Route
      path="/prototypes"
      components={Prototypes} />
    <Route
      path="/prototypes/:prototypeId"
      components={PrototypeDetail} />
    <Route
      path="/devices"
      components={Devices} />
    <Route
      path="/devices/:deviceId"
      components={DeviceDetail} />
  </Route>
)