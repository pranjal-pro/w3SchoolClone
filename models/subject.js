const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSchema = new Schema({
  topic: {
    type: String,
  },
  innerHTML: {
    type: String,
  },
  next: {
    type: String,
  },
  prev: {
    type: String,
  }
});

const subjectSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  topics: [topicSchema],
});

const Subject = mongoose.model('Subject', subjectSchema);
module.exports = Subject;