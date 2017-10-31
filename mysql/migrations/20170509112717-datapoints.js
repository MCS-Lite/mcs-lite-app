var R = require('ramda');
var schema = require('../datapoints/schema');
var doMigrationFromNeDB = require('../utils').doMigrationFromNeDB;
var sequelize = require('../utils').sequelize;
var path = require('path');

module.exports = {
  up: function(migration, DataTypes, done){
    migration
      .createTable('datapoints', schema, {
        charset: 'utf8'
      })
      .success(function() {
        var table = sequelize.define('datapoints', schema);
        var nedbPath = path.resolve(__dirname, `../../db/datapoints.json`);

        doMigrationFromNeDB(
          nedbPath,
          function(entry) {
            const user = R.merge(entry, {
              createdAt: new Date(entry.createdAt)
                .toISOString()
                .replace('Z', ''),
              updatedAt: new Date(entry.updatedAt)
                .toISOString()
                .replace('Z', ''),
              values: JSON.stringify(entry.values)
            });
            return table.create(user);
          },
          done
        );
      });
  },
  down: function(migration, DataTypes, done) {
    done();
  }
};
