module.exports = function(Sequelize) {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    createUserId: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    name: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    symbol: { 
      type: Sequelize.STRING,
      allowNull: false,
    },
    isActive: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    isTemplate: { 
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
