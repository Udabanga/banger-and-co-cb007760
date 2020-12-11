const controller = require("../controllers/file.controller");

module.exports = function (app) {
  app.post("/upload", controller.upload);
  app.get("/files", controller.getListFiles);
  app.get("/files/:name", controller.download);
};
