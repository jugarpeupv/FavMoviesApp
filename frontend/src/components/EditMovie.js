import React, { useState } from "react";
import { useEffect } from "react";

function EditMovie({ match }) {
  const [movie, setMovie] = useState({
    name: "",
    rating: 1,
    description: "",
  });

  let rawParamsId = match.params.id;
  let parsedParamsId = rawParamsId.substring(1, 25);
  const nameInput = document.getElementById("inputDefault");
  const sel = document.getElementById("exampleSelect1");
  const descInput = document.getElementById("exampleTextarea");

  const handleUpdate = async () => {
    const data = {
      name: nameInput.value,
      rating: sel.value,
      description: descInput.value,
    };
    const url = "/movies/" + parsedParamsId;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const response = await fetch(url, options);
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    window.location = "/movieslist";
  };

  async function getMovieIdData() {
    const rawResponse = await fetch("/movies/" + parsedParamsId);
    const parsedResponse = await rawResponse.json();
    console.log(parsedResponse);
    return parsedResponse;
  }

  useEffect(() => {
    let mounted = true;
    const nameInput = document.getElementById("inputDefault");
    const sel = document.getElementById("exampleSelect1");
    const descInput = document.getElementById("exampleTextarea");
    getMovieIdData()
      .then((response) => {
        setMovie(response);
        nameInput.value = response.name;
        sel.value = response.rating;
        descInput.value = response.description;
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <div className="form-group">
        <label className="col-form-label" htmlFor="inputDefault">
          Title:
        </label>
        <input
          type="text"
          className="form-control w-50"
          placeholder="Title"
          autoComplete="off"
          id="inputDefault"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleSelect1">Rating:</label>
        <select className="form-control w-25" id="exampleSelect1">
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
        ></textarea>
      </div>
      <button
        type="button"
        className="btn bg-dark text-white"
        onClick={handleUpdate}
      >
        Update
      </button>
    </div>
  );
}

export default EditMovie;
