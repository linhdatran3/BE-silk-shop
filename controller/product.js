const Product = require("../model/product");
const __basedir = "./resources/static/assets/uploads/";
const __basename = "https://silkshop.herokuapp.com/image/";
const fs = require("fs");
//check:true
module.exports.getAllProducts = (req, res) => {
  Product.find()
    .then((products) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i]?.image !== null) {
          if (products[i]?.image?.slice(0, 4) !== "http") {
            // check image is not link ?
            products[i].image = __basename + products[i].image; //imgae is file and concat the url
          }
        }
      }
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    });
};

// check: true
module.exports.getProduct = (req, res) => {
  try {
    Product.findById(req.params.id).then((product) => {
      if (product.image !== null) {
        if (product.image.slice(0, 4) !== "http") {
          // check image is not link ?
          product.image = __basename + product.image; //imgae is file and concat the url
        }
      }

      res.status(200).json(product);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//check:true
module.exports.getProductCategories = (req, res) => {
  Product.distinct("category")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => console.log(err));
};

//check: true
module.exports.getProductsInCategory = (req, res) => {
  const category = req.params.category;

  Product.find({
    category,
  })
    .then((products) => {
      for (let i = 0; i < products.length; i++) {
        if (products[i].image !== null) {
          if (products[i].image.slice(0, 4) !== "http")
            // check image is not link ?
            products[i].image = __basename + products[i].image; //imgae is file and concat the url
        }
      }
      res.json(products);
    })
    .catch((err) => console.log(err));
};

//check:
module.exports.addProduct = async (req, res) => {
  if (typeof req.body == undefined) {
    res.json({
      status: 400,
      message: "something went wrong! check your sent data",
      success: false,
    });
  } else {
    const product = new Product({
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
    });
    product.save();

    //upload image
    if (req.file) {
      //fileName
      let extension = req.file.originalname.substring(
        req.file.originalname.lastIndexOf(".")
      );
      let fileName = req.file.originalname.substring(
        0,
        req.file.originalname.lastIndexOf(".")
      );
      fileName = fileName + "-" + Date.now() + extension;
      // end fileName
      let newFile = __basedir + fileName;
      fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(newFile, data, function (err) {
          if (err) {
            return res.status(200).send({ message: "File err" });
          } else {
            fs.unlinkSync(req.file.path);
            product
              .updateOne({ image: __basename + fileName })
              .then((product) =>
                res.status(200).json({ message: "add compelte" })
              );
          }
        });
      });
    } else {
      return res.status(200).send({ message: "Please upload a file!" });
    }
  }
};

//check: true
module.exports.editProduct = async (req, res) => {
  if (typeof req.body == undefined || req.params.id == null) {
    res.json({
      status: 400,
      message: "something went wrong! check your sent data",
      success: false,
    });
  } else {
    try {
      const proEdit = await Product.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          image: req.body.image !== null ? req.body.image : "",
        }
      );
      //upload image
      if (req.file) {
        //console.log(req.file);
        //fileName
        let extension = req.file.originalname.substring(
          req.file.originalname.lastIndexOf(".")
        );
        let fileName = req.file.originalname.substring(
          0,
          req.file.originalname.lastIndexOf(".")
        );
        fileName = fileName + "-" + Date.now() + extension;
        // end fileName
        let newFile = __basedir + fileName;
        fs.readFile(req.file.path, function (err, data) {
          fs.writeFile(newFile, data, function (err) {
            if (err) {
              return res.status(200).send({ message: "File err" });
            } else {
              fs.unlinkSync(req.file.path);
              proEdit
                .updateOne({ image: __basename + fileName })
                .then(() =>
                  res.status(200).json({ message: "update product completed" })
                );
            }
          });
        });
      } else {
        res.status(200).json({ success: true, message: "Update completed" });
      }
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  }
};

//check:true
module.exports.deleteProduct = async (req, res) => {
  if (req.params.id == null) {
    res.json({
      status: 400,
      message: "cart id should be provided",
      success: false,
    });
  }
  try {
    Product.findByIdAndDelete({ _id: req.params.id }).then(() =>
      res.status(200).json({
        status: 200,
        message: "Delete successful",
        success: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,
      message: "Internal server error",
      success: false,
    });
  }
};
