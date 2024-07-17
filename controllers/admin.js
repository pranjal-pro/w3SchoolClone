const Subject = require('../models/subject');
const User = require("../models/user");
// Dashbord
  module.exports.getDashbord=async(req,res)=>{
      res.render('admin/dashbord');
  };
// User
  module.exports.getUser=async (req,res)=>{
    const users= await User.find({});
    res.render('admin/users', {users});
  };
  module.exports.deleteUser= async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.toggleAdmin=  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        user.admin = !user.admin;
        await user.save();
        res.status(200).json({ message: 'User admin status toggled successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// Subject
  module.exports.getSubjects =async (req,res)=>{
      let subjects= await  Subject.find({});
    res.render('admin/subjects', {subjects});
  };
  module.exports.postSubject=  async (req, res) => {
    const { subject } = req.body;
    try {
      const newSubject = new Subject({ subject, topics: [] });
      await newSubject.save();
      req.flash("success", "New Subject has been successfully added.");
      res.redirect("/admin/subjects");
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/admin/subjects");
    }
  };
  module.exports.deleteSubject= async (req, res) => {
    try {
      await Subject.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
// subject->topics
  module.exports.getTopics= async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      res.render('admin/topics', { subject});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }};
  module.exports.postTopic= async (req, res) => {
    const { topic } = req.body;
    const innerHTML= '';
    const next= 'nextPage title';
    const prev= 'prevPage title';
    try {
      const subject = await Subject.findById(req.params.id);
      if (subject) {
        subject.topics.push({ topic, innerHTML, next, prev });
        await subject.save();
        res.status(201).redirect('/admin/subjects/'+ req.params.id);
      } else {
        res.status(404).json({ message: 'Subject not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.getTopic= async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      if (subject) {
        let topic= subject.topics.id(req.params.topicId);
        res.render('admin/topic', {topic, subject: req.params.id});
      } else {
        res.status(404).json({ message: 'Topic not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports.deleteTopic= async (req, res) => {
    try {
      const subject = await Subject.findById(req.params.id);
      if (subject) {
        subject.topics.pull({ _id: req.params.topicId });
        await subject.save();
        res.status(200).json(subject);
      } else {
        res.status(404).json({ message: 'Topic not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  module.exports.putTopic= async (req, res) => {
    const { title, innerHTML, next, prev } = req.body;
    
    try {
      const subject = await Subject.findById(req.params.id);
      if (subject) {
        const topic= subject.topics.id(req.params.topicId);
        topic.topic= title;
        topic.innerHTML= innerHTML;
        topic.next= next;
        topic.prev= prev;
        await subject.save();
        res.status(201).json(subject);
      } else {
        res.status(404).json({ message: 'Subject not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
