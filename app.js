const express = require("express");
const app = express();
const db = require("./models");
const port = process.env.PORT || 8000;
const mainMiddlewares = require("./middlewares/mainMiddlewares");
const mainRouter = require("./routes/mainRoute");

// middlewares
mainMiddlewares(app);

// controllers
mainRouter(app);

// for invalid route request
app.use((req, res, next) => {
  const error = new Error("404 url not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.json({ error: error.message });
});

// when you add a new column or field in any data model just give={ alter: true } object into sync function

db.sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => console.log(`server is running on port ${port}`));
});
