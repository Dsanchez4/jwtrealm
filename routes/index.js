const express = require('express');
const index = express.Router();
const ctrlIndex = require("../controllers/index");
const mdlAuth = require("../middleware/index");


index.route("/saveToken")
  .post(ctrlIndex.saveToken);

index.route("/sendMessage")
  .post(ctrlIndex.sendMenssage);

module.exports = index;