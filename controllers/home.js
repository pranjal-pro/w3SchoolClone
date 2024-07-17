const data= require("../data.json");
const Subject = require('../models/subject');

module.exports.home = async (req, res) =>{
  res.render("home/home", {data});
};

module.exports.try = async (req, res) => {
  let { id } = req.params;
  if (!data.try[id]) {
    req.flash("error", "Language Compiler does not exist!");
    res.redirect("/home");
    }
  res.render('home/try', { data, lang: id });;
};

module.exports.page = async (req, res) => {
  const subject = await Subject.findOne({subject: req.params.id});
  if (subject){
    let topic= subject.topics.find(t => t.topic === req.params.topic);
    if(topic)
        res.render('home/page', {data,subject, topic});
    else{
      req.flash("error", "Topic not found!");
      res.redirect("/home");
  }}else{
    req.flash("error", "Subject not found!");
    res.redirect("/home");
}
};
