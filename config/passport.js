const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {}
    )
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((userId, done) =>
    User.findByPk(userId)
      .then((user) => {
        user = user.toJSON();
        done(null, user);
      })
      .catch((e) => console.log(e))
  );
};
