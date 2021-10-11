require("dotenv").config();
let express = require("express");
let Sequelize = require("sequelize");
let session = require("express-session");

let SequelizeStore = require("connect-session-sequelize")(session.Store);

let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    isLoggedIn: false,
    dialect: "mysql",
    storage: "./session.mysql",
  }
);

const sessionStore = new SequelizeStore({
  db: sequelize,
});

let configSession = (app) => {
  app.use(
    session({
      key: "express",
      secret: "secret",
      store: sessionStore,
      resave: true,
      saveUninitialized: true,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
};

sessionStore.sync();
module.exports = configSession;
