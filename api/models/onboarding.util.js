const mongoose = require('mongoose');
const Onboarding = mongoose.model('Onboarding');
const User = mongoose.model('User');

exports.Onboarding = Onboarding;

exports.edit = async (userId, tooltipName) => {
  let user = await User.findOne({
    _id: userId,
  });
  let setQuery = {};
  if (tooltipName === 'resourcesTab') {
    setQuery = { resourcesTab: true };
  } else if (tooltipName === 'discussionForumTab') {
    setQuery = { discussionForumTab: true };
  } else if (tooltipName === 'organizationsTab') {
    setQuery = { organizationsTab: true };
  } else if (tooltipName === 'resourcesView') {
    setQuery = { resourcesView: true };
  } else if (tooltipName === 'discussionForumView') {
    setQuery = { discussionForumView: true };
  }
  await Onboarding.updateOne(
    {
      _id: user.onboarding,
    },
    { $set: setQuery }
  );
};

exports.editAll = async (userId) => {
  let user = await User.findOne({
    _id: userId,
  });

  const setQuery = {
    resourcesTab: true,
    discussionForumTab: true,
    organizationsTab: true,
    resourcesView: true,
    discussionForumView: true,
  };

  await Onboarding.updateOne(
    {
      _id: user.onboarding,
    },
    { $set: setQuery }
  );
};

exports.get = async (userId, tooltipName) => {
  let user = await User.findOne({
    _id: userId,
  });
  const onboarding = await Onboarding.findOne({
    _id: user.onboarding,
  });
  return onboarding[tooltipName];
};
