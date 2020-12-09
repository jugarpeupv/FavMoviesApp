const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//  @desc Add a movie
// @route POST /movies
router.post("/register", async (req, res) => {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.find({ username: req.body.username });
    if (user[0] != undefined) {
      res.send({ message: "User already exits" });
    } else {
      const newUser = new User({
        username: req.body.username,
        password: encryptedPassword,
      });
      await newUser.save();
      res.send(newUser);
    }
  } catch (err) {
    res.send({ message: "Error, unable to create User" });
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    console.log(user);
    if (user[0] == undefined) {
      res.send({ message: "Unsuccesful login, user not found" });
    } else {
      const passwordIsEqual = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (passwordIsEqual) {
        res.send(user);
      } else {
        res.send({
          message: "Unsuccesful login, incorrect password",
        });
      }
    }
  } catch (err) {
    res.send({ message: "Error" });
    console.log(err);
  }
});

module.exports = router;
