const util = require("util");
const multer = require("multer");

let storage = multer.diskStorage({
  destination: "./public/licences",
  filename: (req, file, cb) => {
    cb(null, `licence-${Date.now()}-${file.originalname.replace(/\s/g, '')}`);
  },
});

let uploadFile = multer({
  storage: storage,
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;

