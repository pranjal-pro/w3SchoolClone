module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "Please login first before continuing");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  if (!req.user.admin) {
    req.flash("error", "You need to an admin to access this page");
    res.redirect(`/home`);
  }
  next();
};