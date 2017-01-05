'use strict';

var helperObj = {};

var ReactCompositeComponent = require('react/lib/ReactCompositeComponent');
var ReactComponent = require('react/lib/ReactComponent');
var originalMountComponent;
var mountExtensionPoint;

if (ReactCompositeComponent.Mixin) {
  mountExtensionPoint = ReactCompositeComponent;
  originalMountComponent = ReactCompositeComponent.Mixin.mountComponent;
} else {
  mountExtensionPoint = ReactComponent;
  originalMountComponent = ReactComponent.Mixin.mountComponent;
}

mountExtensionPoint.Mixin.mountComponent = function(rootID, transaction, context) {
  var call = originalMountComponent.call(this, rootID, transaction, context);
  var instance = !this._instance ? this : this._instance;
  var props = instance.props;
  if (props && props.__cachedStyles) {
    helperObj.associateToMediaQuery(instance);
  }
  return call;
};

module.exports = helperObj;
