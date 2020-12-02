module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    fName: {
      type: Sequelize.STRING
    },
    lName: {
      type: Sequelize.STRING
    }
  });

  return User;
};
