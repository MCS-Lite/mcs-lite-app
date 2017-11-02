/**
 *
 * The MIT License (MIT)
 *
 * Devify Platform
 *
 * Copyright (c) 2016 Devify, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

'use strict';

/**
 * Main WoT Framework
 */
var WoT = require('wotcity.io');
var server = require('./server');

/**
 * WoT Modules
 */
var Framework = WoT.Framework
  , WebsocketBroker = server
  , WebsocketRouter = WoT.WebsocketRouter
  , RequestHandlers = WoT.WebsocketRequestHandlers
  , Runtime = WoT.Runtime;

var MCSHandler = require('./mcsHandler');

var $wot = require('../../configs/wot');

/**
 * Util Modules
 */
var merge = require('utils-merge');

/**
 * Websocket URL Router
 */
var wsHandlers = {
   // "/object/([A-Za-z0-9/]+)/send$": RequestHandlers.send,
   // "/object/([A-Za-z0-9/]+)/viewer$": RequestHandlers.viewer,
   // "/object/([A-Za-z0-9/]+)/status$": RequestHandlers.status,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)": MCSHandler.send,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/viewer$": MCSHandler.viewer,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/csv$": MCSHandler.csv,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/status$": MCSHandler.status,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/[0-9]+/[0-9]+/stream$": MCSHandler.streamSender,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/[0-9]+/[0-9]+/stream/viewer$": MCSHandler.streamViewer,
   "/deviceId/([-A-Za-z0-9_]+)/deviceKey/([A-Za-z0-9]+)/[0-9]+/[0-9]+/stream/status$": MCSHandler.streamStatus,
   // "/deviceId/([A-Za-z0-9]+)/deviceKey/([A-Za-z0-9]+)/datachannels/([A-Za-z0-9]+)": MCSHandler.send,
   // "/deviceId/([A-Za-z0-9]+)/deviceKey/([A-Za-z0-9]+)/datachannels/([A-Za-z0-9]+)/viewer$": MCSHandler.viewer,
   // "/deviceId/([A-Za-z0-9]+)/deviceKey/([A-Za-z0-9]+)/datachannels/([A-Za-z0-9]+)/status$": MCSHandler.status,
};

/*
 * Prototype and Class
 */
var Server = function () {
};

/**
 * The server event handlers
 */
Server.prototype.onNewThing = function(thing) {
  // register a new thing to WoT framework
  this.registerThing(thing);

  if (typeof(this._options.onnewthing) === 'function') {
    this._options.onnewthing(thing);
  }
};

Server.prototype.onData = function(payload) {
  if (typeof(this._options.onmessage) === 'function') {
    this._options.onmessage(payload);
  }

  // Send hardware data to FBP network.
  var data = {
    upproc: 'devify-device',
    upport: 'out',
    payload: payload
  };
  this._network.send(data);
};

/**
 * Create an WoT server.
 *
 * @return {Object}
 * @api public
 */
function createServer(options) {
  var instance = new Server();

  // Create FBP Runtime
  var network = new Runtime();
  instance._network = network;

  return merge(instance, options);
}

/**
 * Start a Websocket server.
 *
 * @return {None}
 * @api public
 */
Server.prototype.start = function(options) {
  var port = $wot.port || process.env.PORT;
  var host = $wot.host || process.env.HOST;
  var options = options || {};

  for (var prop in options) {
    if (options.hasOwnProperty(prop)
        && typeof(this._options[prop]) === 'undefined')
      this._options[prop] = options[prop];
  }

  // Load components
  this._network.load(this._options.components || {});

  // Start FBP Network Runtime
  this._network.runtime(this._options.graph || {});

  var server = new WebsocketBroker({
    port: port,
    host: host
  });
  var router = new WebsocketRouter();
  // console.log(this);
  // Thing events from WoT framework
  server.on('newThing', this.onNewThing.bind(this));
  server.on('data', this.onData.bind(this));
  // console.log()
  server.start(router.route, wsHandlers);
};

/**
 * Create the server instance.
 */
var wsBrokerImpl = createServer({
  events: {
  }
});

/**
 * Combined server with framework instance.
 */
var wsServer = new Framework({
  server: wsBrokerImpl
});

/**
 * Export the server.
 */
module.exports = wsServer;
