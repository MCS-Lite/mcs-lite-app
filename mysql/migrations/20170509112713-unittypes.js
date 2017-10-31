var R = require('ramda');
var schema = require('../unittypes/schema');
var doMigrationFromNeDB = require('../utils').doMigrationFromNeDB;
var sequelize = require('../utils').sequelize;
var path = require('path');

module.exports = {
  up: function(migration, DataTypes, done) {
    migration
      .createTable('unittypes', schema, {
        charset: 'utf8'
      })
      .success(function() {
        var table = sequelize.define('unittypes', schema);
        var nedbPath = path.resolve(__dirname, `../../db/unittypes.json`);

        doMigrationFromNeDB(
          nedbPath,
          function(entry) {
            const unittype = R.merge(entry, {
              createdAt: new Date(entry.createdAt)
                .toISOString()
                .replace('Z', ''),
              updatedAt: new Date(entry.updatedAt)
                .toISOString()
                .replace('Z', '')
            });

            return table.create(unittype);
          },
          done
        );
      });
  },
  down: function(migration, DataTypes, done) {
    done();
  }
};
