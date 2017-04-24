"use strict";

if (typeof(Handlers) == "undefined") {
    var Handlers = {};
}

(function() {
  Handlers.send = function(pathname, connection, clients) {
    // the original sender pathname

    // var deviceId = pathname.split('/')[2];
    // var deviceKey = pathname.split('/')[4];
    // var datachannel = pathname.split('/')[6] || '';

    // console.log (deviceId);
    connection.pathname = pathname;

    /*
     * convert sender pathname to viewer pathname
     * eg. '/object/mbedtaiwan/send' to '/object/mbedtaiwan/viewer'
     */
    var paths = pathname;

    // remove the rear string 'send'
    // var viewer = paths;

    connection.viewer = paths + '/viewer';
    connection.csv = paths + '/csv';
    connection.statusViewer = paths + '/status';
    /*
     * initial storage for this viewer
     */
    for (var path in clients) {
        if (path === connection.viewer) { return; }
        if (path === connection.csv) { return; }
    }

    clients[connection.viewer] = [];
    clients[connection.csv] = [];
    clients[connection.statusViewer] = [];
  }

  Handlers.viewer = function(pathname, connection, clients) {
    //console.log("Viewer Routed: " + pathname);

    // the original sender pathname
    connection.pathname = pathname;

    // Save viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing sender.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

  Handlers.csv = function(pathname, connection, clients) {
    connection.pathname = pathname;

    // Save viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing sender.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

  Handlers.status = function(pathname, connection, clients) {
    //console.log("Status Routed: " + pathname);

    // the original sender pathname
    connection.pathname = pathname;

    // Save status viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing status viewer.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

  Handlers.streamSender = function(pathname, connection, clients) {
    connection.pathname = pathname;

    /*
     * convert sender pathname to viewer pathname
     * eg. '/object/mbedtaiwan/send' to '/object/mbedtaiwan/viewer'
     */
    var paths = pathname;

    // remove the rear string 'send'
    // var viewer = paths;

    connection.viewer = paths + '/viewer';
    connection.statusViewer = paths + '/status';
    /*
     * initial storage for this viewer
     */
    for (var path in clients) {
        if (path === connection.viewer)
            return;
    }

    clients[connection.viewer] = [];
    clients[connection.statusViewer] = [];
  }

  Handlers.streamViewer = function(pathname, connection, clients) {
    connection.pathname = pathname;

    // Save viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing sender.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

  Handlers.streamStatus = function(pathname, connection, clients) {
    // the original sender pathname
    connection.pathname = pathname;

    // Save status viewer clients (unlimited clients)
    for (var path in clients) {
        if (path === pathname) {
            clients[path].push(connection);
            return;
        }
    }

    /*
     * Not found. There is not a existing status viewer.
     */
    clients[pathname] = [];
    clients[pathname].push(connection);
  }

})();

if (typeof(module) != "undefined" && typeof(exports) != "undefined")
  module.exports = Handlers;
