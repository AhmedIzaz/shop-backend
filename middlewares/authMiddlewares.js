const { Customer } = require("../models");

exports.isAuthenticated = (req, res, next) => {
  if (req.session.isLoggedIn) {
    return res.json({ message: "customer already logged in" }).end();
  }
  next();
};

exports.notAuthenticated = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.json({ message: "login first" }).status(400).end();
  }
  next();
};

exports.ownerNotAuthenticated = (req, res, next) => {
  if (!req.session.ownerLoggedIn) {
    return res.json({ message: "login first" }).status(400).end();
  }
  next();
};

exports.bindCustomerWithRequest = () => {
  return async (req, res, next) => {
    try {
      if (!req.session.isLoggedIn) {
        return next();
      }
      const customer = await Customer.findOne({ id: req.session.customer.id });

      next();
    } catch (e) {
      res.send(req.session.isLoggedIn).end();
    }
  };
};
