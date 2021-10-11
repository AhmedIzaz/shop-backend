const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const myDatabase = require("../models");
const { bindUserWithRequest } = require("./authMiddlewares");
const expressSession = require("express-session");
const SessionStore = require("express-session-sequelize")(expressSession.Store);

const sequelizeSessionStore = new SessionStore({
  db: myDatabase,
});

const middlewares = [
  cookieParser(),
  expressSession({
    resave: true,
    saveUninitialized: true,
    secret: "secret key",
    store: sequelizeSessionStore,
    cookie: {
      maxAge: "60*1000",
    },
  }),
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
