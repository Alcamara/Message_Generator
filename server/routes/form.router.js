const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
//imported json files
const guests = require("../../public/Guests.json");
const companies = require("../../public/Companies.json");
const msgTemplates = require("../../public/MsgTemplates.json");

/**
 *  GET routes
 */

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

/**
 * POST Routes
 */

router.post("/form", (req, res) => {
  const guestId = req.body.guestId;
  const companyId = req.body.companyId;
  const msgCategoryId = req.body.msgCategoryId;

  let currentTime = new Date().getHours();
  let guest = getGuestObj(guestId, guests);
  let company = getCompanyObj(companyId, companies);
  let template = getMsgTemplate(msgCategoryId, msgTemplates);

  let timeOfDay = getTimeOfDate(currentTime, company.timezone);

  let msg = generateMsg(template, company, guest, timeOfDay, msgCategoryId);

  res.send({ generateMsg: msg });
});

router.post("/form2", (req, res) => {
  const guestId = req.body.guestId;
  const companyId = req.body.companyId;
  const text = req.body.text;

  const company = getCompanyObj(companyId, companies);
  let guest = getGuestObj(guestId, guests);

  const newMsg = {
    msg: text
      .replaceAll("firstName", guest.firstName)
      .replaceAll("lastName", guest.lastName)
      .replaceAll("company", company.company)
      .replaceAll("city", company.city),
  };

  res.send(newMsg);
});

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

// functions that find obj or strings form json files
function getCompanyObj(companyId, companies) {
  for (let index = 0; index < companies.length; index++) {
    if (companies[index].id == companyId) {
      return companies[index];
    }
  }
}

function getGuestObj(guestId, guests) {
  for (let index = 0; index < guests.length; index++) {
    if (guests[index].id == guestId) {
      return guests[index];
    }
  }
}

function getMsgTemplate(msgCategoryId, msgTemplates) {
  for (let index = 0; index < msgTemplates.length; index++) {
    if (msgTemplates[index].id == msgCategoryId) {
      return msgTemplates[index].msg;
    }
  }
}

module.exports = router;
