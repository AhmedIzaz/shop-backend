const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");

exports.get_one_category = async (req, res, next) => {
  try {
    const category = await Product_Category.findOne({
      where: { id: req.params.category_id },
    });
    category
      ? res.json({category:category}).status(200).end()
      : res
          .json({ message: "cant get the object of category" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.product_categories = async (req, res, next) => {
  try {
    const categories = await Product_Category.findAll()
    categories 
      ? res.json({ categories: categories }).status(200).end()
      : res
          .json({ message: "cant get the objects of category" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.create_category = async (req, res, next) => {
  try {
    const new_categories = await Product_Category.create(req.body);
    new_categories
      ? res.json({message:"new category added successfully!"}).status(200).end()
      : res
          .json({ message: "cant create the objects of category" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
