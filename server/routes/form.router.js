const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello world").catch((err) => {
    console.log(`Error in Get : ${err}`);
  });
});

module.exports = router;
