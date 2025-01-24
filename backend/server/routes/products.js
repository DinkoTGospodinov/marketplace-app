const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

router.get("/products", productController.getallProducts);
router.get("/products/:id", productController.getProductById);
router.post("/products/add-product", productController.addProduct);

module.exports = router;
