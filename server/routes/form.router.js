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

  let currentTime = new Date().getHours();
  let guest;
  let company;
  let template;

  console.log(`it worked ${guestId}, ${companyId}, ${msgCategoryId}`);

  for (let index = 0; index < guests.length; index++) {
    if (guests[index].id == guestId) {
      guest = guests[index];
      break;
    }
  }

  for (let index = 0; index < companies.length; index++) {
    if (companies[index].id == companyId) {
      company = companies[index];
      break;
    }
  }

  for (let index = 0; index < msgTemplates.length; index++) {
    if (msgTemplates[index].id == msgCategoryId) {
      template = msgTemplates[index].msg;
      break;
    }
  }

  let timeOfDay = getTimeOfDate(currentTime, company.timezone);
  console.log(`should return even: ${timeOfDay}`);

  // console.log(
  //   template
  //     .replace("firstName", guest.firstName)
  //     .replace("company", company.company)
  //     .replace("roomNumber", guest.reservation.roomNumber)
  //     .replace("timeOfDay", timeOfDay)
  // );

  let msg = generateMsg(template, company, guest, timeOfDay, msgCategoryId);

  res.send({ generateMsg: msg });
});

router.post("/form2", (req, res) => {
  const guestId = req.body.guestId;
  const companyId = req.body.companyId;
  const text = req.body.text;

  console.log(guestId, companyId, text);
  res.sendStatus(200);
});

//
function getTimeOfDate(currentTimeInHour, companyTimeZone) {
  companyCurrentTimeInHour = currentTimeInHour;

  switch (companyTimeZone) {
    case "US/Eastern":
      companyCurrentTimeInHour += 1;
      break;
    case "US/Pacific":
      companyCurrentTimeInHour -= 2;
      break;
    default:
      companyCurrentTimeInHour;
      break;
  }

  if (companyCurrentTimeInHour < 12) {
    return "morning";
  } else if (companyCurrentTimeInHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

function generateMsg(template, company, guest, timeOfDay, msgCategoryId) {
  switch (msgCategoryId) {
    case "1":
      return template
        .replace("firstName", guest.firstName)
        .replace("company", company.company)
        .replace("roomNumber", guest.reservation.roomNumber)
        .replace("timeOfDay", timeOfDay);

    case "2":
      return template
        .replace("timeOfDay", timeOfDay)
        .replace("firstName", guest.firstName)
        .replace("company", company.company); //

    case "3":
      return template
        .replace("timeOfDay", timeOfDay)
        .replace("firstName", guest.firstName)
        .replace("company", company.company);

    default:
      return "words";
  }
}

module.exports = router;
