module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('unittypes', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
      },
      createUserId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      symbol: { 
        type: DataTypes.STRING,
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