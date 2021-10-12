const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const myDatabase = require("../models");
const { bindCustomerWithRequest } = require("./authMiddlewares");
const session = require("express-session");
const mysqlSession = require("express-mysql-session")(session);

const options = {
  user: "root",
  password: "01839465030",
  database: "my_shop",
  host: "localhost",
};

const sessionStore = new mysqlSession(options);

const middlewares = [
  session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
    store: sessionStore, // assigning sessionStore to the session
  }),
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
