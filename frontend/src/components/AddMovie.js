import React from "react";
import { useState } from "react";

function AddMovie() {
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  //Handle on Submit Button
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const dataMovieInfo = {
      name: movieName,
      rating: movieRating,
      description: movieDescription,
    };

    async function postData(url, data) {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const parsedResponse = await response.json();
      return parsedResponse;
    }

    postData("/movies", dataMovieInfo).then((response) => {
      console.log(response);
    });

    const form = document.getElementById("formAddMovie");
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit} id="formAddMovie">
        <div className="form-group">
          <label className="col-form-label" htmlFor="inputDefault">
            Title:
          </label>
          <input
            type="text"
            className="form-control w-50"
            autoComplete="off"
            id="inputDefault"
            onChange={(e) => {
              setMovieName(e.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleSelect1">Rating:</label>
          <select
            className="form-control w-25"
            id="exampleSelect1"
            onChange={(e) => {
              setMovieRating(e.target.value);
            }}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleTextarea">Description</label>
          <textarea
            className="form-control w-50"
            id="exampleTextarea"
            rows="5"
            onChange={(e) => {
              setMovieDescription(e.target.value);
            }}
          ></textarea>
        </div>
        <button type="submit" className="btn bg-dark text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
