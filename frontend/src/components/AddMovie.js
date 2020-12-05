import React from "react";

const handleOnSubmit = async (e) => {
  e.preventDefault();
  const form = document.getElementById("formAddMovie");
  const nameInput = document.getElementById("inputDefault");
  const descInput = document.getElementById("exampleTextarea");
  const sel = document.getElementById("exampleSelect1");
  let opt = sel.options[sel.selectedIndex];
  const nameMovie = nameInput.value;
  let ratingMovie = opt.value;
  const descMovie = descInput.value;

  const dataMovieInfo = {
    name: nameMovie,
    rating: ratingMovie,
    description: descMovie,
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

  form.reset();
};

function AddMovie() {
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
        <button type="submit" className="btn bg-dark text-white">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddMovie;
