module.exports = function(Sequelize) {
  return {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE
  };
};
