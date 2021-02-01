const util = require("util");
const multer = require("multer");
// const maxSize = 5 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    // console.log( file.originalname.replace(/\s/g, ''));
    cb(null, `${Date.now()}-bangerco-${file.originalname.replace(/\s/g, '')}`);
  },
});

let uploadFile = multer({
  storage: storage,
  // limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;


// const multer = require("multer");
// const util = require("util");

// const storage = multer.diskStorage({
//   destination: "./public/images",
//   filename: (req, file, cb) => {
//     console.log( file.originalname.replace(/\s/g, ''));
//     cb(null, `${Date.now()}-bangerco-${file.originalname.replace(/\s/g, '')}`);
//   },
// });

// const uploadFile = multer({
//   storage:storage
// }).single("image");

// let uploadFileMiddleware = util.promisify(uploadFile);
// module.exports = uploadFileMiddleware;
