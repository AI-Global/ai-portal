const mongoose = require('mongoose');
const User = mongoose.model('User');
const email = require('../lib/email');

exports.User = User;

exports.create = async ({ name, email }) => {
  let emailToken = Math.random()
    .toString(36)
    .replace(/[^a-z]+/g, '');
  let user = new User({ name, email, emailToken });
  await user.save();
  await email.send.createAccount(params.email, {
    name: params.name,
    verifyUrl: `${process.env.BASE_URL}/verify?email=${email}&token=${emailToken}`,
  });
  return user;
};

exports.get = async (where) => {
  return User.findOne(where);
};

exports.update = async (user, params) => {
  return await Model.update({ _id: user._id }, { $set: params }).exec();
};

exports.getByUsernameOrEmail = async (userOrEmail) => {
  let user = await User.findOne({ username: userOrEmail });
  if (user) {
    return user;
  }
  return await User.findOne({ email: userOrEmail });
};

exports.getAll = async () => {
  return await User.find();
};
