module.exports = {
  up: function(migration, DataTypes, done){
    migration.createTable('users', {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: { 
        type: DataTypes.STRING,
        allowNull: false,
      },
      userImage: {
        type: DataTypes.STRING,
        allowNull: false, 
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isActive: { 
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      isAdmin: { 
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