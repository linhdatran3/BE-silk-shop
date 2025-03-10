const express = require("express");
const router = express.Router();
const product = require("../controller/product");
const file = require("../controller/file");

const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let uploadFile = multer({
  //storage: storage,
  dest: "temp/",
  limits: { fileSize: maxSize },
});

router.get("/", product.getAllProducts);
router.get("/categories", product.getProductCategories);
router.get("/category/:category", product.getProductsInCategory);
router.get("/:id", product.getProduct);

router.post("/:id", uploadFile.single("image"), product.editProduct);
router.post("/", uploadFile.single("image"), product.addProduct);

// router.get("/files", file.getListFiles);
// router.get("/files/:name", file.download);

router.patch("/:id", product.editProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;
