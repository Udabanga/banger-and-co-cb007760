module.exports = (sequelize, Sequelize) => {
  const Vehicle = sequelize.define("vehicles", {

    manufacturer: {
      type: Sequelize.STRING,
    },
    model: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
    transmission: {
      type: Sequelize.STRING,
    },
    fuelType: {
      type: Sequelize.STRING,
    },
    dailyCost: {
      type: Sequelize.STRING,
    },
    seatNumber: {
      type: Sequelize.INTEGER,
    },
    imageName: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
    }
  });


  return Vehicle;
};
