const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");
const homeController = require("../controllers/home.js");

router.route("/").get(homeController.home);

router.get("/try/:id",isLoggedIn,wrapAsync(homeController.try));

router.get("/:id/:topic", isLoggedIn, homeController.page);

module.exports = router;
