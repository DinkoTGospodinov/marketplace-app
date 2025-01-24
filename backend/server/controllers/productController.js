
const { default: mongoose } = require("mongoose");
const Product = require("../models/Product.js");

exports.getallProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    console.log("FETCHING PRODUCT BY ID", id);

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by id", error);
    res.status(500).json({ message: "Server Error", error });
  }
};

exports.addProduct = async (req, res) => {
  const { title, description, price, category, location, images, ownerId } =
    req.body;


    if(!title, !description, !price, !category, !location, !images, !ownerId ){
      return res.status(400).json({message: "All fields are required"});
    }
  console.log(req.body);

  try {
    const newProduct = new Product({
      title,
      description,
      price,
      category,
      location,
      images,
      ownerId,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error adding product", error);
    res.status(500).json({ message: "Server Error", error });
  }
};
