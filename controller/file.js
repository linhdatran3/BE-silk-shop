const __basedir = "./resources/static/assets/uploads/";
const fs = require("fs");
const upload = async (req, res) => {
  try {
    if (req.file) {
      //let lastestId = row.insertId;
      let extension = req.file.originalname.substring(
        req.file.originalname.lastIndexOf(".")
      );
      let fileName = req.file.originalname.substring(
        0,
        req.file.originalname.lastIndexOf(".")
      );
      fileName = fileName + "-" + Date.now() + extension;
      let newFile = __basedir + fileName;
      fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(newFile, data, function (err) {
          if (err) {
            return res.status(200).send({ message: "File err" });
          } else {
            fs.unlinkSync(req.file.path);
            res.status(200).send({
              message: "Uploaded the file successfully: " + fileName,
            });

            // student.set("Image", fileName);
            // student.save("STU_ID=" + lastestId, function (err, row) {
            //   if (err) {
            //     res.send(Result.error(1, "Update image error!"));
            //   } else {
            //     student.set("STU_ID", lastestId);
            //     var reqUrl = url.format({
            //       protocol: req.protocol,
            //       host: req.get("host"),
            //       // pathname: req.originalUrl,
            //     });
            //     student.set("Image", reqUrl + "/data/student/" + fileName);
            //     res.send(Result.data(student));
            //   }
            // });
          }
        });
      });
    } else {
      return res.status(400).send({ message: "Please upload a file!" });
    }
  } catch (err) {

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  download,
};
