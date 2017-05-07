'use strict';
const express = require('express');
const index = express.Router();
const ctrlIndex = require("../controllers/index");
const mdlAuth = require("../middleware/index");


index.route("/login")
  .post(ctrlIndex.login);

index.route("/registerUser")
  .post(ctrlIndex.registerUser);

index.route("/regiterIncidence")
  .post(ctrlIndex.registerIncidence);


/*
index.route("/allUsers")
  .get(ctrlIndex.listUsers);

index.route("/saveToken")
  .post(ctrlIndex.saveToken);

index.route("/sendMessage")
  .post(ctrlIndex.sendMenssage);
 */

index.route("/test")
  .post(ctrlIndex.test);

module.exports = index;