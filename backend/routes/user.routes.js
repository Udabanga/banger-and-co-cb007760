const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userPage
  );

  app.get(
    "/api/test/employee",
    [authJwt.verifyToken, authJwt.isEmployee],
    controller.employeePage
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminPage
  );

  // Retrieve all Users
  app.get("/api/users/", controller.findAll);

  // Retrieve a Users
  app.post("/api/users/find", controller.findOne);

  // Delete a User
  app.delete("/api/users/delete", controller.delete);

  // Edit User
  app.put("/api/users/update", controller.update);
};
