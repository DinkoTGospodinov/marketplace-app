const express = require("express");
const productController = require("../controllers/productController");
const authMiddleware = require("../Middlewares/authMiddleware");

const router = express.Router();

router.get("/products", productController.getallProducts);
router.get("/products/:id", productController.getProductById);
router.post(
  "/add-product",
  authMiddleware,
  productController.addProduct
);

module.exports = router;
