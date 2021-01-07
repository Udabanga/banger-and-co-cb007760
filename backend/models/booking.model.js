module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
      vehicleID: {
        type: Sequelize.STRING
      },
      userID: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.STRING
      },
      endDate: {
        type: Sequelize.STRING
      },
    });
  
    return Booking;
  };
  