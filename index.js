const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
// initial
const app = express();
const PORT = process.env.PORT || 4000;

// config
dbConnect();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.use("/api/user", authRoute);

// error handler
app.use(notFound);
app.use(errorHandler);

// start app
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
