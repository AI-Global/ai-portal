const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscussionPostSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, default: '', required: true },
  replies: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] } ],
  upvotes: { type: Number, default: 0 },
  timestamp: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
  tags: [] //TODO
})

mongoose.model('DiscussionPost', DiscussionPostSchema);
module.exports = DiscussionPostSchema;