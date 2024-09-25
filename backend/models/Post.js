const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  comments: { type: [String], required: true, default: ["very nive post", "insightful"]}
});

module.exports = mongoose.model('Post', postSchema);
