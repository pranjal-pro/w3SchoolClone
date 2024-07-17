const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl, isLoggedIn } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

router.get("/logout", userController.logout);

router.route('/profile')
      .get(isLoggedIn, wrapAsync(userController.profile))
      .post(isLoggedIn, wrapAsync(userController.update))
      .delete(isLoggedIn, wrapAsync(userController.delete));


      router.get('/search/suggestions', isLoggedIn, userController.suggestion);
module.exports = router;
