const mongoose = require('mongoose');
const Comment = mongoose.model('Comment');
const Resource = mongoose.model('Resource');
const User = mongoose.model('User');
const DiscussionPost = mongoose.model('DiscussionPost');

exports.Comment = Comment;

exports.create = async (user, discussionPost, text, timestamp, resId, parentId) => {
  let comment = new Comment({
    user: user,
    text: text,
    timestamp: timestamp,
    resource: resId,
    discussionPost: discussionPost,
    parent: parentId,
  });
  await comment.save();

  if (resId) {
    // only add to resource object if the comment was made on a resource page
    await Resource.updateOne(
      { _id: resId },
      { $push: { comments: comment._id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { createdComments: comment._id } }
    );
  }

  if (discussionPost) {
    // only add to discussion post object if the comment was made on discussion post
    await DiscussionPost.updateOne(
      { _id: discussionPost },
      { $push: { comments: comment._id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { createdComments: comment._id } }
    );
  }
  return comment;
};

exports.get = async where => {
  return Comment.findById(where);
};

exports.addReply = async (parentID, discussionPost, user, text, timestamp, resId) => {
  let comment = new Comment({
    user: user,
    text: text,
    timestamp: timestamp,
    resource: resId,
    discussionPost: discussionPost,
    parent: parentID,
  });
  await comment.save();
  await Comment.updateOne(
    { _id: parentID },
    { $push: { replies: comment._id } }
  );

  if (resId) {
    // add new child comment to resource, if applicable
    await Resource.updateOne(
      { _id: resId },
      { $push: { comments: comment._id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { createdComments: comment._id } }
    );
  }
  console.log(discussionPost);
  if (discussionPost) {
    // add new child comment to discussion post, if applicable
    await DiscussionPost.updateOne(
      { _id: discussionPost },
      { $push: { comments: comment._id } }
    );
    await User.updateOne(
      { _id: user._id },
      { $push: { createdComments: comment._id } }
    );
  }
};

exports.delete = async (commentId, userId) => {
  let comment = await Comment.findOne({ _id: commentId });
  if (comment.parent) {
    await Comment.updateOne(
      { _id: comment.parent },
      { $pull: { replies: commentId } }
    );

    if (comment.resource) {
      await Resource.updateOne(
        { _id: comment.resource },
        { $pull: { comments: commentId } }
      );
    }
    await User.updateOne(
      { _id: userId },
      { $pull: { createdComments: commentId } }
    );
  } else {
    for (const replyId of comment.replies) {
      await Comment.deleteOne({ _id: replyId });
      await Resource.updateOne(
        { _id: comment.resource },
        { $pull: { comments: replyId } }
      );
      await User.updateOne(
        { _id: userId },
        { $pull: { createdComments: replyId } }
      );
    }
  }

  await Comment.deleteOne({ _id: commentId });
};

exports.upvote = async commentID => {
  await Comment.updateOne({ _id: commentID }, { $inc: { upvotes: 1 } });
};

exports.toJSON = comment => {
  return JSON.parse(JSON.stringify(comment));
};
