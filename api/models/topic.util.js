const mongoose = require('mongoose');
const Topic = mongoose.model('Topic');

exports.Topic = Topic;

exports.create = async (params) => {
  let topic = new Topic(params);
  await topic.save();
  return topic;
};

exports.getAll = async () => {
  return await Topic.find();
};

exports.toJSON = async (resource) => {
  return { ...resource };
};
