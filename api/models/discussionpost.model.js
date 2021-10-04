const mongoose = require('mongoose');
const { RESOURCE_TYPES, RESOURCE_PATHS } = require('./enums');

const Schema = mongoose.Schema;

const DiscussionPostSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lastUpdated: { type: Date, required: true },
  header: { type: String, default: '', required: true },
  text: { type: String, default: '', required: true },
  comments: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: [] },
  ],
  upvotes: { type: Number, default: 0 },
  timestamp: { type: Date, required: true },
  type: [{ type: String, enum: RESOURCE_TYPES, default: [] }],
  path: [{ type: String, enum: RESOURCE_PATHS, default: [] }],
});

mongoose.model('DiscussionPost', DiscussionPostSchema);
module.exports = DiscussionPostSchema;
