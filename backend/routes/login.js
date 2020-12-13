const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../passportConfig")(passport);

//  @desc Add a movie
// @route POST /movies
router.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send({ message: "No user exists or password doesnt match" });
    else {
      req.logIn(user, async (err) => {
        if (err) throw err;
        // res.send({message: "Succesfully Authenticated"});
        console.log("Succesfully Authenticated from /login route");
        console.log(req.user);

        next();
      });
    }
  })(req, res, next);
});

module.exports = router;
