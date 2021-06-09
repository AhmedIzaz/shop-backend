const {
  Product_Category,
  Product,
  Customer,
  Shop,
  Order,
} = require("../models");
const bcrypt = require("bcrypt")

exports.login_customer = async (req, res, next) => {
  try {
    const customer = 
  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
}


exports.logout_customer = async (req, res, next) => {
  try {

  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
}


exports.signup_customer = async (req, res, next) => {
  try {
    const hashed_password = await bcrypt.hash(req.body.password)
    const new_customer = await Customer.create({ email, password: hashed_password, username, age, picture, contact_number })
    !new_customer ? res.json({ error: "there are something went wrong to signup as a customer" }).status(404).end()

  } catch (e) {
    res.json({ error: e.message }).status(404).end();
  }
}


exports.customer_dashboard = async (req, res, next) => {
  try {

  } catch (e) {
    res.json({ error: e.message }).status(404).end(}
}