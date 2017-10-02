var fs = require('fs');
var Sequelize = require('sequelize');
var dbConfig = require('../../configs/db.json');
var schema = require('../unittypes/schema')(Sequelize);
var sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
  }
);

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable('unittypes', schema, {
      charset: 'utf8'
    }).success(function () {
      var unittypesTable = sequelize.define('unittypes', schema);
      var nedbUnittypesPath = process.cwd() + '/db/unittypes.json';

      fs.readFile(nedbUnittypesPath, 'utf-8', function(err, data) {
        var unittypes = JSON.parse(`[${data.replace(/}(?!\n$)/g, '},')}]`);

        unittypes.forEach(function(unittype) {
          var createdAt = new Date(unittype.createdAt).toISOString().replace('Z', '');
          var updatedAt = new Date(unittype.updatedAt).toISOString().replace('Z', '');

          unittypesTable.create({
            createUserId: unittype.createUserId,
            name: unittype.name,
            symbol: unittype.symbol,
            isActive: unittype.isActive,
            isTemplate: unittype.isTemplate,
            createdAt: createdAt,
            updatedAt: updatedAt,
          });
        }, this);

        done();
      });
    });
  },
  down: function(migration, DataTypes, done) {
    done();
  }
};
