const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db");
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passportLocal = require("passport-local");
const cors = require("cors");

// Load config
dotenv.config({ path: "./config/config.env" });

// Initializations
const app = express();
connectDB();

// --------------------------Middlewares

// Static Files
app.use(express.static(path.join(__dirname, "../frontend/build")));

//Config
app.use(cookieParser(process.env.SECRET));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV == "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//Session support
app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

//Passport-middleware !Important to invoke passport.session() after session support
app.use(passport.initialize());
app.use(passport.session());

// Strategy
require("./passportConfig")(passport);

//Keeping track of req.user and req.session
app.use((req, res, next) => {
  console.log("req.user:");
  console.log(req.user);
  console.log("req.session:");
  console.log(req.session);
  next();
});

// Routes
app.use("/movies", require("./routes/index"));
app.use("/users", require("./routes/login"));

//-------------------------Server

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
