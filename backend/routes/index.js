const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

//  @desc Retrieve movies
// @route GET /movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
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
      res.json({ message: "Sorry, no movie founded" });
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
  console.log(req.body);
  const newMovie = new Movie({
    name: req.body.name,
    rating: req.body.rating,
    description: req.body.description,
  });

  try {
    await newMovie.save();
    res.send({ message: "new Film Added" });
  } catch (err) {
    res.send("Error");
    console.log(err);
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
    await Movie.deleteOne({ _id: req.params.id });
    res.send({ message: "Film deleted" });
  } catch (err) {
    res.send("Error");
    console.log(err);
  }
});

module.exports = router;
