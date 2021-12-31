const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const __basedir = "/resources/static/assets/uploads/";

//let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // destination determines folder to store the uploaded files.
//     cb(null, "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     //filename determines the name of the file inside the destination folder.
//     console.log(file);
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   },
// });
// kh su dung

let uploadFile = multer({
  //storage: storage,
  dest: "temp/",
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile); //util.promisify() makes the exported middleware object can be used with async-await.
module.exports = uploadFileMiddleware;
