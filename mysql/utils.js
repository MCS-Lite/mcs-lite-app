var Sequelize = require('sequelize');
var dbConfig = require('../configs/db.json');
var fs = require('fs');

module.exports = {
  sequelize: new Sequelize(
    dbConfig.database,
    dbConfig.username,
    dbConfig.password,
    {
      host: dbConfig.host,
      port: dbConfig.port,
      logging: false,
    }
  ),
  doMigrationFromNeDB: function doMigrationFromNeDB(path, doMigrate, done) {
    fs.readFile(path, 'utf-8', function(err, data) {
      var entries = JSON.parse(`[${data.replace(/}\n(?!$)/g, '},')}]`);

      const entriesCount = entries.length;
      let migratedCount = 0;

      if (entriesCount === 0) return done();

      entries.forEach(function(entry) {
        doMigrate(entry).success(function() {
          migratedCount += 1;

          if (entriesCount === migratedCount) {
            console.log('migration from ', path, ' complete');

            done();
          }
        });
      });
    });
  }
};
