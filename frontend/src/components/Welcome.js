import React from "react";

function Welcome() {
  return (
    <div className="mt-5">
      <div className="jumbotron">
        <h1 className="display-3">Hello, user!</h1>
        <p className="lead">This is a web app to store your fav movies</p>
        <hr className="my-4" />
        <p>
          Soon, a passport login will be implemented and you will only be able
          to see your movie list and others people's public lists
        </p>
        <p className="lead">
          <a
            className="btn bg-dark text-white btn-lg"
            href="/addmovie"
            role="button"
          >
            Add your fav movies
          </a>
        </p>
      </div>
    </div>
  );
}

export default Welcome;
