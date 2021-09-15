const mongoose = require('mongoose');
const DiscussionPost = mongoose.model('DiscussionPost');
const queries = require('../lib/queries');

exports.DiscussionPost = DiscussionPost;

let populate = resourceQuery => {
  return resourceQuery
    .populate('comments', '-__v -comments')
    .populate({ path: 'comments', populate: { path: 'user', model: 'User' } });
};

exports.search = async (query, fields) => {
  let result = queries.searchQuery(
    DiscussionPost,
    {
      queryFields: ['text', 'header', 'type', 'path'],
      anyFields: ['user', 'comments', 'upvotes', 'timestamp', 'lastUpdated'],
      sorts: {
        byCreationDateAsc: ['timestamp', 1],
        byCreationDateDesc: ['timestamp', -1],
        byUpdatedDateAsc: ['lastUpdated', 1],
        byUpdatedDateDesc: ['lastUpdated', -1],
        byNameAsc: ['header', 1],
        byNameDesc: ['header', -1],
        byUpvotesAsc: ['upvotes', 1],
        byUpvotesDesc: ['upvotes', -1],
      },
    },
    query,
    fields
  );
  return await result;
};

exports.create = async (user, text, timestamp, types = [], paths = []) => {
  let discussionPost = new DiscussionPost({
    user: user,
    text: text,
    timestamp: timestamp,
    types: types,
    paths: paths,
  });

  await discussionPost.save(); 
};

exports.get = async postId => {
  return await populate(DiscussionPost.findById(postId));
};

exports.addReply = async (user, text, timestamp, postId) => {
  let comment = new Comment({
    user: user,
    text: text,
    timestamp: timestamp,
    discussionPost: postId,
  });
  await comment.save();

  await DiscussionPost.updateOne(
      { _id: postId },
      { $push: { comments: comment._id } }
    );
};

exports.delete = async postId => {
  await DiscussionPost.deleteOne({ _id: postId });
}

exports.upvote = async postId => {
  await DiscussionPost.updateOne({ _id: postId }, { $inc: { upvotes: 1 } });
};

exports.toJSON = post => {
  return JSON.parse(JSON.stringify(post));
};