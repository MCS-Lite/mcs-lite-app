var db = {};

var rules = {
  '/object/123123/aaa': function(payload, db) {
    console.log(123);
  },
};

function importURL(payload) {
  var paths = payload.pathname.split('/');
  return rules[paths](payload, db);
};

function init(config) {
  if (config.db === 'nedb') {
    db[config.db] = require('../../nedb/index');
  }
  return {
    db: db,
    import: importURL,
  };
};

module.exports = {
  init: init,
}