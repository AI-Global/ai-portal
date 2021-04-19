const mongoose = require('mongoose');
const DiscussionPost = mongoose.model('DiscussionPost');
const queries = require('../lib/queries');

exports.DiscussionPost = DiscussionPost;

exports.search = async (query, fields) => {
  let result = queries.searchQuery(
    DiscussionPost,
    {
      queryFields: ['user', 'text', 'comments', 'upvotes', 'timestamp'],
      anyFields: ['type', 'path'],
      sorts: {
        byUploadDateAsc: ['uploadDate', 1],
        byNameAsc: ['name', 1],
        byUploadDateDesc: ['uploadDate', -1],
        byCreationDateDesc: ['creationDate', -1],
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
  return DiscussionPost.findById(postId);
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