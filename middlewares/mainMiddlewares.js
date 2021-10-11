const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const myDatabase = require("../models");
const { bindUserWithRequest } = require("./authMiddlewares");

const middlewares = [
  cors(),
  express.urlencoded({ extended: true }),
  express.json(),

  bindUserWithRequest(),
];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
