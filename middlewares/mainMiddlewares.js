const express = require("express");
const cors = require("cors")
const middlewares = [cors(), express.urlencoded({ extended: true }), express.json()];

module.exports = (app) => {
  middlewares.map((middleware) => {
    app.use(middleware);
  });
};
