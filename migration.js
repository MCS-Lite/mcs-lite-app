var config = require('./configs/db.json');
var migrationPath, migratorOptions, getSequelize, goMigration;
var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
console.log(config);

migrationPath = path.resolve(__dirname, `./${config.dialect}/migrations`);

migratorOptions = { path: migrationPath };

getSequelize = function() {
  var db, password, username, dialect, port, options;
  db = config.database;
  password = config.password || null;
  username = config.username || null;
  dialect = config.dialect || 'mysql';
  port = config.port || 3306;
  options = {
    host: config.host,
    dialect: dialect,
    port: port,
    logging: false,
  } || {};
  console.log(options, username, password);
  return new Sequelize(db, username, password, options);
};

var sequelize = getSequelize();
sequelize.getMigrator(migratorOptions);

goMigration = function(filepath) {
  return fs.exists(filepath, function(exists) {
    if (exists) {
      console.log('Migration start...');
      return sequelize
        .migrate()
        .success(function() {
          return console.log('Migration success.');
        })
        .error(function(err) {
          return console.log(err);
        });
    }
  });
};

goMigration(migrationPath);
