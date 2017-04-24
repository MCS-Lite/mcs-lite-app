module.exports = function(Sequelize) {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    deviceId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    deviceKey: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    datachannelId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    values: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  };
};
