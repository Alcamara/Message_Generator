const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//imported json files
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");
const msgTemplates = require("../../public/MsgTemplates.json");

router.get("/", (req, res) => {
  const guestList = [];
  const listOfCompanies = [];
  const msgCategoryList = [];

  //loop through g
  for (let guest of guests) {
    guestList.push({
      id: guest.id,
      firstName: guest.firstName,
      lastName: guest.lastName,
    });
  }

  for (let company of companies) {
    listOfCompanies.push({
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
    companies: listOfCompanies,
    category: msgCategoryList,
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
