const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
  res.render("user/signup");
};

module.exports.signup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    let admin= false;
    const newUser = new User({ email, username, admin });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Signed up successfully");
      res.redirect("/home");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderLoginForm = (req, res) => {
  res.render("user/login");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome to w3School!");
  let redirectUrl = res.locals.redirectUrl || "/home";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/home");
  });
};

module.exports.profile = (req, res, next) => {
  res.render("user/profile");  
};

module.exports.update= async (req, res) => {
  try {
      const { username, email, password } = req.body;
      const user = await User.findById(req.user._id);

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) await user.setPassword(password);

      await user.save();
      req.flash('success', 'Profile updated successfully!');
      res.redirect('/profile');
  } catch (error) {
      console.error('Error updating profile:', error);
      req.flash('error', 'Error updating profile.');
      res.redirect('/profile');
  }
};

module.exports.delete= async (req, res) => {
  try {
      await User.findByIdAndDelete(req.user._id);
      req.logout();
      req.flash('success', 'Account deleted successfully.');
      res.redirect('/');
  } catch (error) {
      console.error('Error deleting account:', error);
      req.flash('error', 'Error deleting account.');
      res.redirect('/profile');
  }
};

const Subject = require('../models/subject');
module.exports.suggestion= async (req, res) => {
  try {
      const query = req.query.q.toLowerCase();
      const subjects = await Subject.find();

      let suggestions = [];

      subjects.forEach(subject => {
          if (subject.subject.toLowerCase().includes(query)) {
          
          subject.topics.forEach(topic => {
              if (topic.topic.toLowerCase()) {
                  suggestions.push(`home/${subject.subject}/${topic.topic}`);
              }
          });}
      });

      res.json(suggestions);
  } catch (error) {
      console.error('Error fetching suggestions:', error);
      res.status(500).send('Internal Server Error');
  }
};