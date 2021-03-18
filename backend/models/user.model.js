module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    email: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    fName: {
      type: Sequelize.STRING,
    },
    lName: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    },
    drivingLicence: {
      type: Sequelize.STRING,
    },
    // identityForm: {
    //   type: Sequelize.STRING,
    // },
  });

  return User;
};
