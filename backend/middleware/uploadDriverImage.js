const util = require("util");
const multer = require("multer");

// let uploadFile = multer({
//   storage: storage,
// }).single("file1");

let uploadFile = multer({
  storage: multer.diskStorage({
    destination: "./",
    filename: (req, file, cb) => {
      cb(null, `driverImage.jpg`);
    },
  }),
}).fields([
  { name: "driverImage", maxCount: 1 },
]);

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
