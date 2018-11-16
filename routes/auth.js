const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/", (req, res, next) => {
  res.render("auth/login");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/auth/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/auth/signup", (req, res, next) => {
  if (req.body.username === "" || req.body.password === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
  }
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The username already exists" });
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      email
    });

    newUser
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch(err => {
        res.render("/auth/signup", { message: "Something went wrong" });
      });
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

router.post("/auth/dashboard", (req, res, next) => {
  res.redirect("/auth/generatedArt");
});

module.exports = router;
