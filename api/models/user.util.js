const mongoose = require('mongoose');
const User = mongoose.model('User');
const crypto = require('crypto');
const _email = require('../lib/email');

exports.User = User;

exports.makeSalt = () => {
  return (new Date().valueOf() * Math.random())
    .toString(36)
    .replace(/[^a-z]+/g, '');
};

exports.makeToken = () => {
  return (new Date().valueOf() * Math.random())
    .toString(36)
    .replace(/[^a-z]+/g, '');
};

exports.comparePassword = (user, passwordAttempt) => {
  return (
    crypto
      .createHmac('sha1', user.salt)
      .update(passwordAttempt)
      .digest('hex') == user.hashedPassword
  );
};

exports.create = async ({ name, email, username, password }) => {
  let emailToken = exports.makeToken();
  let salt = exports.makeSalt();
  let hashedPassword = crypto
    .createHmac('sha1', salt)
    .update(password)
    .digest('hex');
  let user = new User({
    name,
    email,
    username,
    emailToken,
    salt,
    hashedPassword,
  });
  await user.save();
  try {
    await _email.send.createAccount(email, {
      name: name,
      verifyURL: `${process.env.BASE_URL}/verify?username=${username}&token=${emailToken}`,
    });
  } catch (e) {
    console.warn(e);
  }
  return user;
};

exports.get = async (where) => {
  return User.findOne(where);
};

exports.update = async (user, params) => {
  return await User.update({ _id: user._id }, { $set: params }).exec();
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

exports.sendReset = async (user) => {
  let token = exports.makeToken();
  await exports.update(user, { resetToken: token });
  await _email.send.resetPassword(user.email, {
    resetURL: `${process.env.BASE_URL}/reset?username=${user.username}&token=${token}`,
  });
};

exports.resetPassword = async (user, resetToken, newPassword) => {
  if (user.resetToken != resetToken) return false;
  let salt = exports.makeSalt();
  let hashedPassword = crypto
    .createHmac('sha1', salt)
    .update(newPassword)
    .digest('hex');
  await exports.update(user, {
    resetToken: null,
    salt: salt,
    hashedPassword: hashedPassword,
  });
};

exports.verifyEmail = async (user, token) => {
  if (user.emailToken != token) return false;
  await exports.update(user, {
    emailToken: null,
    emailVerified: true,
  });
  return true;
};

exports.toTokenJSON = (user) => {
  let { _id, email, name, username, role } = user;
  return { _id, email, name, username, role };
};

exports.toPrivateJSON = (user) => {
  return JSON.parse(JSON.stringify(user));
};
