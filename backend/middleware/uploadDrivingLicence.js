const util = require("util");
const multer = require("multer");

// let uploadFile = multer({
//   storage: storage,
// }).single("file1");

let uploadFile = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}-${file.originalname.replace(/\s/g, "")}`);
    },
  }),
}).fields([
  { name: "drivingLicence", maxCount: 1 },
  { name: "identityForm", maxCount: 1 },
]);

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
