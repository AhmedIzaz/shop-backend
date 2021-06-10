const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");
const Owner = require("../models");
const bcrypt = require("bcrypt");

exports.signup = async (req, res, next) => {
  try {
    const hashed_password = await bcrypt.hash(req.body.password);
    const owner = await Owner.create({
      email,
      password: hashed_password,
      username,
      age,
      picture,
      description,
      contact_number,
    });
    owner
      ? res
          .json({ message: "owner has successfully signedup" })
          .status(200)
          .end()
      : res
          .json({ message: "owner signing up is dismissed" })
          .status(404)
          .end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.login = async (req, res, next) => {
  try {
    const owner = await Owner.findOne({ where: { email: req.body.email } });
    const matched_password = await bcrypt.compare(
      req.body.password,
      owner.password
    );
    owner && matched_password
      ? res.json({ ownerLogin: true }).status(200).end()
      : res.json({ ownerLogin: false }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};

exports.logout = async (req, res, next) => {
  try {
    console.log("working!!");
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
exports.ownerDashboard = async (req, res, next) => {
  try {
    const owner = await Owner.findOne({ where: { id: 1 } });
    const owners_shop = await owner.getShop();
    owner && owners_shop
      ? res.json(owners_shop).status(200).end()
      : res.json({ message: "cant get the shop" }).status(404).end();
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
};
