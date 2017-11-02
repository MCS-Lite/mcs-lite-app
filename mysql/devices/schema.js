var Sequelize = require('sequelize');

module.exports = {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  },
  createUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deviceId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deviceKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deviceName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deviceDescription: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  deviceImageURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  prototypeId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isHeartbeating: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  fwId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
};
