import React, { useState } from "react";
import { useEffect } from "react";

function EditMovie({ match }) {
  const [movie, setMovie] = useState({
    name: "",
    rating: 1,
    description: "",
  });
  const [inputTitle, setInputTitle] = useState("");
  const [inputSel, setInputSel] = useState("");
  const [inputDesc, setInputDesc] = useState("");

  // Handle Update Click
  const handleUpdate = async () => {
    const data = {
      name: inputTitle,
      rating: inputSel,
      description: inputDesc,
    };
    const url = "/movies/" + match.params.id;
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

  useEffect(() => {
    let mounted = true;
    async function getMovieIdData() {
      const rawResponse = await fetch("/movies/" + match.params.id);
      const parsedResponse = await rawResponse.json();
      console.log(parsedResponse);
      return parsedResponse;
    }
    getMovieIdData()
      .then((response) => {
        setMovie(response);
        setInputTitle(response.name);
        setInputSel(response.rating);
        setInputDesc(response.description);
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
          value={inputTitle}
          onChange={(e) => {
            setInputTitle(e.target.value);
          }}
          id="inputDefault"
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleSelect1">Rating:</label>
        <select
          className="form-control w-25"
          id="exampleSelect1"
          value={inputSel}
          onChange={(e) => setInputSel(e.target.value)}
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
            setInputDesc(e.target.value);
          }}
          value={inputDesc}
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
