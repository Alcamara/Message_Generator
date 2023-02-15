const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");

router.get("/form", (req, res) => {
  console.log(guests);
  res.send(companies);
});

module.exports = router;
