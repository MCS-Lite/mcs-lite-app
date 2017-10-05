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
  prototypeKey: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prototypeName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prototypeDescription: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  prototypeImageURL: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  createUserId: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  version: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPublic: {
    type: Sequelize.BOOLEAN,
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
    defaultValue: Sequelize.fn('NOW'),
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
};
