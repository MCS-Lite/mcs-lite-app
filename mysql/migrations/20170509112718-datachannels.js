module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('datachannels', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      prototypeId: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      datachannelName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      datachannelId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      datachannelDescription: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: { 
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      channelType: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isHidden: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      format: { 
        type: DataTypes.TEXT, 
        allowNull: false,
      },
      createUserId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      updatedAt: { 
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      createdAt: { 
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    }, {
      charset: 'utf8'
    });
    done();
  },
  down: function(migration, DataTypes, done){
    done();
  }
};