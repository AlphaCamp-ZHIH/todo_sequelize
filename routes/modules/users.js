const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const db = require("../../models");
const User = db.User;

const router = express.Router();

router.get("/login", (req, res) => {});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => res.render("register"));

router.post("/register", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  User.findOne({ where: { email } }).then((user) => {
    if (user) {
      return res.render("register",{
        name,
        email,
        password,
        confirmPassword
      });
    }
    return bcrypt
      .getSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash,
        })
      )
      .then(() => res.redirect("/"))
      .catch((e) => console.log(e));
  });
});

router.get("/logout", (req, res) => {});

module.exports = router;
