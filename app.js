const express = require("express");
const app = express();
const db = require("./models");
const port = process.env.PORT || 8000;

db.sequelize.sync().then(() => {
  app.listen(port, () => console.log(`server is running on port ${port}`));
});
