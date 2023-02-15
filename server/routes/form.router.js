const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//imported json files
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");
const msgTemplates = require("../../public/MsgTemplates.json");

router.get("/guests", (req, res) => {
  const guestList = [];

  for (let guest of guests) {
    guestList.push({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
    });
  }

  res.send({
    guests: guestList,
  });
});

router.get("/companies", (req, res) => {
  const listOfCompanies = [];

  for (let company of companies) {
    listOfCompanies.push({
      id: company.id,
      name: company.company,
    });
  }

  res.send({
    companies: listOfCompanies,
  });
});

router.get("/categories", (req, res) => {
  const msgCategoryList = [];

  for (let msg of msgTemplates) {
    msgCategoryList.push({
      id: msg.id,
      category: msg.category,
    });
  }

  res.send({
    categories: msgCategoryList,
  });
});

router.post("/form", (req, res) => {
  const guestId = req.body.guestId;
  const companyId = req.body.companyId;
  const msgCategoryId = req.body.msgCategoryId;
  console.log(`it worked ${guestId}, ${companyId}, ${msgCategoryId}`);
  res.sendStatus(200);
});

module.exports = router;
