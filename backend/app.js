const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const passport = require("passport");
const expressSession = require("express-session");
const cookieParser = require("cookie-parser");
const passportLocal = require("passport-local");

// Load config
dotenv.config({ path: "./config/config.env" });

// Initializations
const app = express();
connectDB();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
// });

// Logging
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}

// Static Files
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Routes
app.use("/movies", require("./routes/index"));
app.use("/users", require("./routes/login"));

// app.get("*", (req, res) =>
//   res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
// );

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
