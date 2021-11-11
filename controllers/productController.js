const { Product, Product_Category } = require("../models");

exports.products = async (req, res, next) => {
  try {
    const products = await Product.findAll();
    const categories = await Product_Category.findAll();
    products || products.length == 0
      ? res
          .json({ products: products, categories: categories })
          .status(200)
          .end()
      : res
          .json({ message: "cant get the objects of product" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
