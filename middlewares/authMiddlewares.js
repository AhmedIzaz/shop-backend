const { Customer } = require("../models");

exports.isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.json({ message: "customer already logged in" }).end();
  }
  next();
};

exports.notAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.send("login first").status(400).end();
  }
  next();
};

exports.bindCustomerWithRequest = () => {
  return async (req, res, next) => {
    try {
      if (!req.session.isLoggedIn) {
        return next();
      }
      let customer = await Customer.findOne({ _id: req.session.customer.id });
      req.customer = customer;
      next();
    } catch (e) {
      res.send(req.session.isLoggedIn).end();
    }
  };
};
