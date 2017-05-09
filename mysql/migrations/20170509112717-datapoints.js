module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('datapoints', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      deviceId: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      deviceKey: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      datachannelId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      values: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      updatedAt: { 
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      isActive: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false,
      },
    }, {
      charset: 'utf8',
    });
    done();
  },
  down: function(migration, DataTypes, done){
    done();
  }
};