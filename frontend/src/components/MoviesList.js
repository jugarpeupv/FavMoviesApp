import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function MoviesList() {
  const [movies, setMovies] = useState([]);

  // Fetch /movies function
  async function getMovieList() {
    const rawResponse = await fetch("/movies");
    const parsedResponse = await rawResponse.json();
    return parsedResponse;
  }

  // onClick functions
  const handleDelete = async (movieid) => {
    const response = await fetch(`/movies/${movieid}`, {
      method: "DELETE",
    });
    const parsedResponse = await response.json();
    console.log(parsedResponse);

    getMovieList()
      .then((parsedResponse) => setMovies(parsedResponse))
      .catch((err) => console.log(err));
  };

  // Action displayed when loading the page the first time
  useEffect(() => {
    let mounted = true;
    getMovieList()
      .then((response) => setMovies(response))
      .catch((err) => console.log(err));

    return () => (mounted = false);
  }, []);

  return (
    <div className="mt-5">
      {movies.map((movie) => {
        return (
          <div key={movie._id}>
            <div className="card border-secondary mb-3 w-75">
              <div className="card-header">{movie.name}</div>
              <div className="card-body">
                <h6 className="card-text">Rating: {movie.rating}</h6>
                <p className="card-text">Description: {movie.description}</p>
              </div>
            </div>

            <Link
              to={`/movie/${movie._id}`}
              className="btn bg-dark text-white mb-5 mt-0 flex"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={() => handleDelete(movie._id)}
              className="btn bg-dark text-white mb-5 ml-2 mt-0"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MoviesList;
