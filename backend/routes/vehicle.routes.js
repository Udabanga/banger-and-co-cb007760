const { authJwt } = require("../middleware");
const controller = require("../controllers/vehicle.controller");

module.exports = function (app) {
  // Retrieve all Vehicles
  app.get("/api/vehicles/", controller.findAll);

  // Retrieve all Vehicles from search
  app.post("/api/vehicles/available", controller.findAvailable);

  // Create a Vehicle
  app.post("/api/vehicles/create", controller.create);

  // Retrieve a Vehicle
  app.post("/api/vehicles/find", controller.findOne);

  // Retrieve a Vehicle's Bookings
  app.post("/api/vehicles/find/bookings", controller.findOneBookings);
  

  // Delete a Vehicle
  app.delete("/api/vehicles/delete", controller.delete);

  // Edit Vehicle
  app.put("/api/vehicles/update", controller.update);
};
