module.exports = {
  connectToDB: function(config) {
    return require('../../' + config.db);
  },
  handleRouter: function(app, Routers) {
    for (var value in Routers) {
      var path = Routers[value].path;
      for (var method of Routers[value].methods) {
        if (Routers[value].hasOwnProperty('middleware')) {
          app[method](path, Routers[value].middleware, Routers[value].handler);
        } else {
          app[method](path, Routers[value].handler);
        }
      }
    }
  },
};