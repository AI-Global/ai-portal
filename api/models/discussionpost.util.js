const mongoose = require('mongoose');
const DiscussionPost = mongoose.model('DiscussionPost');

exports.DiscussionPost = DiscussionPost;

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