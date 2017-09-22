module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('devices', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      createUserId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceId: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      deviceKey: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      deviceDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      deviceImageURL: { 
        type: DataTypes.STRING,
        allowNull: true,
      },
      prototypeId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      isHeartbeating: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isPublic: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      fwId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      }
    }, {
      charset: 'utf8'
    });
    done();
  },
  down: function(migration, DataTypes, done){
    done();
  }
};