module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("vehicles", {
      type: {
        type: Sequelize.STRING
      },
      manufacturer: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      colour: {
        type: Sequelize.STRING
      },
      fuelType: {
        type: Sequelize.STRING
      },
      imageName: {
        type: Sequelize.STRING
      }
    });
  
    return Vehicle;
  };
  