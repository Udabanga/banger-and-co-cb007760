const { authJwt } = require("../middleware");
const controller = require("../controllers/vehicle.controller");

module.exports = function (app) {
  // Retrieve all Vehicles
  app.get("/api/vehicels/", controller.findAll);

  // Create a Vehicle
  app.get("/api/vehicels/create", controller.create);

  // Retrieve a Vehicle
  app.post("/api/vehicles/find", controller.findOne);

  // Edit Vehicle
  app.put("/api/vehicles/update", controller.update);
};
