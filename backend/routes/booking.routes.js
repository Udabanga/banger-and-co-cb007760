const { authJwt } = require("../middleware");
const controller = require("../controllers/booking.controller");

module.exports = function (app) {
  // Retrieve all Bookings
  app.get("/api/bookings/", controller.findAll);

  // Create a Bookings
  app.post("/api/bookings/create", controller.create);

};
