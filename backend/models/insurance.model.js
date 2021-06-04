module.exports = (sequelize, Sequelize) => {
  const Insurance = sequelize.define("user_logins", {
    nic: {
      type: Sequelize.STRING,
    },
  });


  return Insurance;
};
