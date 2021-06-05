const express = require("express");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const db = require("../../models");
const User = db.User;

const router = express.Router();

router.get("/login", (req, res) => res.render("login"));

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
  const errors = [];
  if (!email || !name || !password || !confirmPassword){
    errors.push({message:"每個欄位皆必填"});
  };
  if(password !== confirmPassword){
    errors.push({ message: "密碼與確認密碼不相符！" });
  };
  if(errors.length){
    return res.render('register',{name,email,password,confirmPassword,errors})
  }
    User.findOne({ where: { email } }).then((user) => {
      if (user) {
        console.log("User already exists");
        req.flash("warning_msg", "此用戶已存在");
        return res.render("register", {
          name,
          email,
          password,
          confirmPassword,
        });
      }
      return bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) =>
          User.create({
            name,
            email,
            password: hash,
          })
        )
        .then(() => res.redirect("/"))
        .catch((err) => console.log(err));
    });
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "已成功登出");
  return res.redirect("/users/login");
});

module.exports = router;
