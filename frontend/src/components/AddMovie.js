import React from "react";
import { useState } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LocalMoviesIcon from "@material-ui/icons/LocalMovies";
import StarsSharpIcon from "@material-ui/icons/StarsSharp";
import DescriptionSharpIcon from "@material-ui/icons/DescriptionSharp";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FaceIcon from "@material-ui/icons/Face";

function AddMovie() {
  const [movieName, setMovieName] = useState("");
  const [movieRating, setMovieRating] = useState("1");
  const [moviePrivacy, setMoviePrivacy] = useState("Public");
  const [movieDescription, setMovieDescription] = useState("");

  //Handle on Submit Button
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const dataMovieInfo = {
      name: movieName,
      rating: movieRating,
      privacy: moviePrivacy,
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
        {/* TITLE */}
        <div className="form-group">
          <label className="col-form-label" htmlFor="inputDefault">
            <LocalMoviesIcon className="mr-1" />
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

        {/* RATING */}
        <div className="form-group">
          <label htmlFor="exampleSelect1">
            <StarsSharpIcon className="mr-1" />
            Rating:
          </label>
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

        {/* PUBLIC OR PRIVATE INPUT */}
        <div class="form-group">
          <label htmlFor="selectPublicPrivate">
            <VisibilityIcon className="mr-1" />
            Privacy:{" "}
          </label>
          <select
            class="custom-select w-25 d-block"
            id="selectPublicPrivate"
            onChange={(e) => {
              setMoviePrivacy(e.target.value);
            }}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* DESCRIPTION TEXT AREA */}
        <div className="form-group">
          <label htmlFor="exampleTextarea">
            {" "}
            <DescriptionSharpIcon className="mr-1" />
            Description
          </label>
          <textarea
            className="form-control w-50"
            id="exampleTextarea"
            rows="5"
            onChange={(e) => {
              setMovieDescription(e.target.value);
            }}
          ></textarea>
        </div>

        {/* SUBMIT BUTTON*/}
        <button type="submit" className="btn bg-dark text-white flex">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
