const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get("/login", (req, res) => {});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);

router.get("/register", (req, res) => {});

router.post("/register", (req, res) => {});

router.get("/logout", (req, res) => {});

module.exports = router;
