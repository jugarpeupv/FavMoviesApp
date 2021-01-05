const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

//  @desc Retrieve movies
// @route GET /movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    // Experimental
    if (req.session.passport != undefined) {
      const filteredMovies = movies.filter(
        (movie) =>
          movie.privacy == "Public" ||
          movie.userid === req.session.passport.user
      );
      console.log(
        "We are here req.session.passport.user !=undefined with req.passport"
      );
      res.json(filteredMovies);
    } else {
      const filteredMovies = movies.filter(
        (movie) => movie.privacy == "Public"
      );
      console.log("We are here without req.passport");
      res.json(filteredMovies);
    }
  } catch (err) {
    console.log("There is an error");
    console.log(err);
  }
});

//  @desc Retrieve once specific movie
// @route GET /movies/:id
router.get("/:id", async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      res.json({ message: "Sorry dude, no movie founded" });
    } else {
      res.json(movie);
    }
  } catch (err) {
    console.log(err);
  }
});

//  @desc Add a movie
// @route POST /movies
router.post("/", async (req, res) => {
  if (!req.user) {
    let reqUserId = "Anonymous";
    let reqUserName = "Anonymous";

    const newMovie = new Movie({
      name: req.body.name,
      rating: req.body.rating,
      privacy: req.body.privacy,
      description: req.body.description,
      userid: reqUserId,
      username: reqUserName,
    });

    try {
      await newMovie.save();
      res.send({ message: "new Film Added" });
    } catch (err) {
      res.send("Error");
      console.log(err);
    }
  } else {
    let reqUserId = req.user._id;
    let reqUserName = req.user.username;

    const newMovie = new Movie({
      name: req.body.name,
      rating: req.body.rating,
      privacy: req.body.privacy,
      description: req.body.description,
      userid: reqUserId,
      username: reqUserName,
    });
    try {
      await newMovie.save();
      res.send({ message: "new Film Added" });
    } catch (err) {
      res.send("Error");
      console.log(err);
    }
  }
});

//  @desc Update a movie
// @route PUT /movies/:id
router.put("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    rating: req.body.rating,
    description: req.body.description,
  });
  if (movie) {
    res.send({ message: "Film updated" });
  } else {
    res.send({ message: "Sorry, unable to update" });
  }
});

//  @desc Delete a movie
// @route DELETE /movies/:id
router.delete("/:id", async (req, res) => {
  try {
    const movieDeleted = await Movie.findById({ _id: req.params.id });
    console.log("movieDeleted: " + movieDeleted);
    //we should first check if req.session.passport exists
    console.log("req.session.passport.user: " + req.session.passport.user);
    if (
      req.session.passport.user == undefined &&
      movieDeleted.userid == "Anonymous"
    ) {
      await Movie.deleteOne({ _id: req.params.id });
      res.send({ message: "Film deleted" });
    } else if (req.session.passport.user == movieDeleted.userid) {
      await Movie.deleteOne({ _id: req.params.id });
      res.send({ message: "Film deleted" });
    } else if (req.session.passport.user != movieDeleted.userid) {
      res.send({
        message:
          "Sorry, you are not the user who created the film. Unable to delete.",
      });
    }
  } catch (err) {
    res.send("Error deleting movie");
    console.log(err);
  }
});

module.exports = router;
