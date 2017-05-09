module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('prototypes', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      prototypeId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      prototypeKey: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      prototypeName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      prototypeDescription: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prototypeImageURL: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      createUserId: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      version: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isTemplate: { 
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
      },id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      prototypeId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      prototypeKey: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      prototypeName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      prototypeDescription: { 
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prototypeImageURL: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      createUserId: { 
        type: DataTypes.STRING, 
        allowNull: false,
      },
      version: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPublic: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isTemplate: { 
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