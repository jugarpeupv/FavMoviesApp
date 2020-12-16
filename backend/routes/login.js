const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../passportConfig")(passport);

//  @desc login
// @route POST /users/login
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send({ message: "No user exists or password doesnt match" });
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        // res.send({message: "Succesfully Authenticated"});
        console.log("Succesfully Authenticated from /login route");
        res.send(req.user);
        next();
      });
    }
  })(req, res, next);
});

//  @desc login
// @route GET /users/login
router.get("/login", (req, res) => {
  const data = { user: req.user, passport: req.session.passport };
  res.send(data);
});

//  @desc logout
// @route GET /users/logout
router.get("/logout", (req, res) => {
  if (req.user) {
    req.logOut();
    res.send({ message: "Succesfully logout" });
  }
});

//  @desc Add a movie
// @route POST /movies
router.post("/register", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.send({ message: "User already exits" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: encryptedPassword,
      });
      await newUser.save();
      res.send({
        message: "Congrats! You are now registered, please proceed to login",
      });
    }
  } catch (err) {
    res.send({ message: "Error, unable to create User" });
    console.log(err);
  }
});

module.exports = router;
