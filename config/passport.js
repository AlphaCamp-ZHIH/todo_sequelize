const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

const db = require("../models");
const User = db.User;

module.exports = () => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ where: { email } }).then((user) => {
          if (user) {
            return bcrypt.compare(password, user.password).then((isMatch) => {
              if (isMatch) {
                console.log('登入成功')
                user = user.toJSON();
                return done(null, user);
              }
              console.log('密碼錯誤')
              return done(null, false);
            });
          }
          console.log('帳號不存在')
          return done(null, false);
        });
      }
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
