const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");

router.get("/form", (req, res) => {
  const guestList = [];
  const companiesList = [];

  for (let guest of guests) {
    guestList.push({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
    });
  }

  for (let company of companies) {
    companiesList.push({
      id: company.id,
      name: company.company,
    });
  }

  res.send({ guestList: guestList, companiesList: companiesList });
});

module.exports = router;
