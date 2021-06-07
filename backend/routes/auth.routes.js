const { verifyRegister } = require("../middleware");
const controller = require("../controllers/auth.controller");
var multer = require('multer')
// var upload = multer()
var upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
    },
  }),
});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/register", upload.fields([{ name: "drivingLicence", maxCount: 1 }, { name: "identityForm", maxCount: 1 }]),
    [
      verifyRegister.checkDuplicateEmail,
      verifyRegister.checkRolesExisted
    ],
    controller.register
  );

  app.post("/api/auth/login", controller.login);
};
