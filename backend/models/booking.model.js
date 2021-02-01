module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("bookings", {
      vehicleID: {
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      pickUpTime: {
        type: Sequelize.DATE
      },
      dropOffTime: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      }
    });

    // Association
    // Booking.associate = function(models) {
    //   Booking.hasOne(models.vehicleID, {foreignKey: 'id',sourceKey: 'vehicleID'});
    // }
    
    return Booking;
  };
  