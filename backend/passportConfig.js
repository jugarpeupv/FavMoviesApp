const User = require("./models/User");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new LocalStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) {
          console.log("New LocalStrategy no user found");
          return done(null, false);
        }
        console.log("New LocalStrategy a user was found");
        console.log("New LocalStrategy username: " + username);
        console.log("New LocalStrategy password: " + password);

        if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              console.log("password matched");
              console.log(user);
              return done(null, user);
            } else {
              console.log("password didnt match");
              return done(null, false);
            }
          });
        }
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({ _id: id }, (err, user) => {
      done(err, user);
    });
  });
};
