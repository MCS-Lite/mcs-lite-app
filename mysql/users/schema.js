module.exports = function(Sequelize) {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userName: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    userImage: {
      type: Sequelize.STRING,
      allowNull: false, 
    },
    isActive: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    isActive: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    isAdmin: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  };
};
