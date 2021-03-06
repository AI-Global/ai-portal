const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const queries = require('../lib/queries');

exports.Comment = Comment;

exports.create = async (user, text, timestamp) => {
  let comment = new Comment({
    user: user,
    text: text,
    timestamp: timestamp,
  });

  await comment.save();

  return comment;
}

exports.get = async (where) => {
  return Comment.findOne(where);
};

exports.addReply = async (parentID, user, text, timestamp) => {
  let newComment = await exports.create(user, text, timestamp);
  await Comment.updateOne({ _id: parentID }, { $push: { replies: newComment._id }, $set: { parent: parentID } });
}

exports.delete = async (commentID) => {
  let comment = await Comment.findOne({ _id: commentID });
  if (comment.parent) {
    await Comment.updateOne({ _id: comment.parent }, { $pull: { replies: commentID } })
  }

  if (comment.replies.length > 0) {
    await Comment.updateOne({ _id: commentID }, { $set: { deleted: true } });
  }
  else {
    await Comment.deleteOne({ _id: commentID });
  }
}

exports.upvote = async (commentID) => {
  let comment = await Comment.findOne({ _id: commentID });
  await Comment.updateOne({ _id: commentID }, { $inc: { upvotes: 1 } });
}
