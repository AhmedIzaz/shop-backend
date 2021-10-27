const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const myDatabase = require("../models");
const { bindCustomerWithRequest } = require("./authMiddlewares");
const session = require("express-session");
const mysql = require("mysql2");
const mysqlSession = require("express-mysql-session")(session);

const option = {
  user: "root",
  password: "01839465030",
  database: "my_shop",
  host: "localhost",
};

const sessionStore = new mysqlSession(option);

const middlewares = [
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  }),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: "cookie_secret",
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  }),

  // bindCustomerWithRequest(),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
