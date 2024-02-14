const express = require("express");
const { User, Product, Admin } = require("../database");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    username: admin.username,
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = { username: username, password: password };
      const newAdmin = new Admin(obj);
      newAdmin.save();
      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "2h",
      });
      res.json({ message: "Admin created successfully", token });
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/addproduct", authenticateJwt, async (req, res) => {
  const { ProductID, Title, Description, Price, imageLink, Onair } = req.body;
  try {
    const existingProduct = await Product.findOne({ ProductID });
    if (existingProduct) {
      res.status(403).json({ message: "Product already exists" });
    } else {
      const obj = {
        ProductID: ProductID,
        Title: Title,
        Description: Description,
        Price: Price,
        imageLink: imageLink,
        Onair: Onair,
      };

      const newProduct = new Product(obj);
      await newProduct.save();

      res.json({ message: "Product added successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/product/:productId", authenticateJwt, async (req, res) => {
  try {
    const product = await Product.findOne({ ProductID: req.params.productId });
    if (product) {
      product.Title = req.body.Title;
      product.Description = req.body.Description;
      product.Price = req.body.Price;
      product.imageLink = req.body.imageLink;
      product.Onair = req.body.Onair;

      const updatedProduct = new Product(product);
      await updatedProduct.save();

      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating Product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/products", authenticateJwt, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    res.status(403).json({ message: "error", error });
  }
});

router.get("/product/:productId", authenticateJwt, async (req, res) => {
  try {
    const productId = await Product.findOne({
      ProductID: req.params.productId,
    });
    if (!productId) {
      res.status(404).json({ message: "no product found" });
    } else {
      res.json({
        ProductID: productId.ProductID,
        Title: productId.Title,
        Description: productId.Description,
        Price: productId.Price,
        imageLink: productId.imageLink,
        Onair: productId.Onair,
      });
    }
  } catch (error) {
    console.error("Error Showing Product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
