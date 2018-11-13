const express = require("express");
const router = express.Router();
const app = require("../app");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/dashboard", (req, res, next) => {
  res.render("dashboard");
});

router.get("/myArt", (req, res, next) => {
  res.render("myArt");
});

router.get("/generatedArt", (req, res, next) => {
  res.render("generatedArt");
});

router.get("/about", (req, res, next) => {
  res.render("about");
});

module.exports = router;
