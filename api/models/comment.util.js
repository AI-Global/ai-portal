const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Resource = mongoose.model('Resource');
const queries = require('../lib/queries');

exports.Comment = Comment;

exports.create = async (user, text, timestamp, resId) => {
  let comment = new Comment({
    user: user,
    text: text,
    timestamp: timestamp,
    resource: resId 
  });
  await comment.save();

  if (resId) { // only add to resource object if the comment was made on a resource page
    await Resource.updateOne(
      { _id: resId }, 
      { $push: { comments: comment._id }}
    );
  }

  return comment;
}

exports.get = async (where) => {
  return Comment.findOne(where);
};

exports.addReply = async (parentID, user, text, timestamp, resId) => {
  let newComment = await exports.create(user, text, timestamp);
  await Comment.updateOne(
    { _id: parentID }, 
    { $push: { replies: newComment._id }, $set: { parent: parentID } }
  );

  if (resId) { // add new child comment to resource, if applicable 
    await Resource.updateOne(
      { _id: resId }, 
      { $push: { comments: newComment._id }}
    );
  }
}

exports.delete = async (commentID) => {
  let comment = await Comment.findOne({ _id: commentID });
  if (comment.parent) {
    await Comment.updateOne(
      { _id: comment.parent }, 
      { $pull: { replies: commentID } }
    );
  }

  if (comment.resource) {
    await Resource.updateOne(
      { _id: comment.resource }, 
      { $pull: { comments: commentID }}
    );
  }

  if (comment.replies.length > 0) { // don't want to necessarily delete child comments if parent is deleted
    await Comment.updateOne(
      { _id: commentID }, 
      { $set: { deleted: true } }
    );
  }
  else {
    await Comment.deleteOne({ _id: commentID });
  }
}

exports.upvote = async (commentID) => {
  let comment = await Comment.findOne({ _id: commentID });
  await Comment.updateOne(
    { _id: commentID }, 
    { $inc: { upvotes: 1 } }
  );
}
