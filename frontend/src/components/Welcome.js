import React, { Fragment, useEffect, useState } from "react";

function Welcome() {
  const [user, setUser] = useState([]);
  const [loginErrorMessage, setLoginErrorMessage] = useState();
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  // Handle X LoginErrorMessage
  const handleLoginErrorMessage = () => {
    setLoginErrorMessage("");
  };

  // Handle Logout Click
  const handleLogout = () => {
    setUser([]);
  };

  // Handle Login Click
  const handleLoginClick = async () => {
    async function getUser() {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      };

      const response = await fetch("/users/login", options);
      const parsedResponse = await response.json();
      return parsedResponse;
    }
    getUser()
      .then((res) => {
        if (res.message != undefined) {
          setLoginErrorMessage(res);
        } else {
          setUser(res);
        }
      })
      .catch((err) => console.log(err));
    setInputUsername("");
    setInputPassword("");
  };

  return (
    <Fragment>
      {user[0] !== undefined ? (
        <div className="mt-5">
          <div className="jumbotron flex-auto justify-content-between pt-3">
            <button
              type="button"
              onClick={handleLogout}
              className="btn bg-dark text-white float-right"
            >
              Logout
            </button>
            <h1 className="display-3">
              Hello, {user[0] !== undefined ? user[0].username : "user"}!
            </h1>
            <p className="lead">This is a web app to store your fav movies</p>
            <hr className="my-4" />
            <p>
              Soon, a passport login will be implemented and you will only be
              able to see your movie list and others people's public lists
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
      ) : (
        <div className="mt-5">
          <div className="jumbotron">
            <h1 className="display-3">
              Hello, {user[0] !== undefined ? user[0].username : "user"}!
            </h1>
            <p className="lead">This is a web app to store your fav movies</p>
            <hr className="my-4" />

            {loginErrorMessage ? (
              <div className="alert alert-dismissible alert-danger w-50 h-25">
                <button
                  onClick={handleLoginErrorMessage}
                  type="button"
                  className="close"
                  data-dismiss="alert"
                >
                  &times;
                </button>
                <strong>{loginErrorMessage.message}</strong>
              </div>
            ) : (
              <p></p>
            )}
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputDefault">
                Username:
              </label>
              <input
                type="text"
                className="form-control w-25"
                autoComplete="off"
                id="inputUserName"
                value={inputUsername}
                onChange={(e) => setInputUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label" htmlFor="inputDefault">
                Password:
              </label>
              <input
                type="text"
                className="form-control w-25"
                autoComplete="off"
                id="inputUserPassword"
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              onClick={handleLoginClick}
              className="btn bg-dark text-white"
            >
              Login
            </button>
            <button type="submit" className="btn bg-dark text-white ml-2">
              Register
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default Welcome;
