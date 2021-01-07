const { authJwt } = require("../middleware");
const controller = require("../controllers/vehicle.controller");

module.exports = function (app) {
  // Retrieve all Vehicles
  app.get("/api/vehicels/", controller.findAll);

  // Retrieve all Vehicles with a Type
  app.get("/api/vehicles/type", controller.findAllWithType);

  // Create a Vehicle
  app.post("/api/vehicles/create", controller.create);

  // Retrieve a Vehicle
  app.post("/api/vehicles/find", controller.findOne);
  

  // Delete a Vehicle
  app.delete("/api/vehicles/delete", controller.delete);

  // Edit Vehicle
  app.put("/api/vehicles/update", controller.update);
};
