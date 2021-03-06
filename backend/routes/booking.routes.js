const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
  // Retrieve all Bookings
  app.get("/api/bookings", controller.findAll);

  // Retrieve all Bookings From single User
  app.post("/api/bookings/user", controller.findAllUser);

  // Retrieve all Bookings From single User
  app.post("/api/bookings/find", controller.findOne);

  // Create a Bookings
  app.post("/api/bookings/create", controller.create);

  // Update Boooking
  app.put("/api/bookings/update", controller.update);

  // Report Driver
  app.post("/api/bookings/reportDriver", controller.reportDriver);

  // Fraudulent User
  app.post("/api/bookings/fraudulentUser", controller.fraudulentUser);

  // Competitor Prices
  app.get("/api/competitorPrices", controller.competitorPrices);

  

};
