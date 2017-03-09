const express = require('express');
const index = express.Router();
const ctrlIndex = require("../controllers/index");
const mdlAuth = require("../middleware/index");

index.route('/login')
  .post(ctrlIndex.login);

index.route("/private")
  .post(mdlAuth.authPrivate,
    ctrlIndex.authRoute);

index.route("/users")
  .post(mdlAuth.authPrivate,
    ctrlIndex.getUsers);

module.exports = index;