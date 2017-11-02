var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  prototypeId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datachannelName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  datachannelId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  datachannelDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  channelType: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  isHidden: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  format: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  createUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  hasHistory: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
};
