module.exports = function(Sequelize) {
  return {
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    prototypeId: { 
      type: Sequelize.STRING, 
      allowNull: false,
    },
    datachannelName: { 
      type: Sequelize.STRING,
      allowNull: false,
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
      defaultValue: Sequelize.NOW,
    },
    createdAt: { 
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    isActive: { 
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  };
};
