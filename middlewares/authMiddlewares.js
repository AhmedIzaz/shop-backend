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

exports.bindUserWithRequest = () => {
  return async (req, res, next) => {
    try {
      if (!req.session.isLoggedIn) {
        return next();
      }
      let user = await User.findOne({ _id: req.session.user._id });
      console.log(req.session.user);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  };
};
