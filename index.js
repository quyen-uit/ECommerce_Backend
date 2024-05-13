const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv").config();
const authRoute = require("./routes/authRoute");
const bodyParser = require("body-parser");
// initial
const app = express();
const PORT = process.env.PORT || 4000;
dbConnect();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api/user", authRoute);
// start app
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
