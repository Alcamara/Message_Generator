const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//imported json files
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");
const msgTemplates = require("../../public/MsgTemplates.json");

router.get("/form", (req, res) => {
  const guestList = [];
  const companiesList = [];
  const msgCategoryList = [];

  console.log(msgTemplates);

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

  for (let msg of msgTemplates) {
    msgCategoryList.push({
      id: msg.id,
      category: msg.category,
    });
  }

  res.send({
    guests: guestList,
    companies: companiesList,
    category: msgCategoryList,
  });
});

module.exports = router;
