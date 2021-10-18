const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OnboardingSchema = new Schema({
  resourcesTab: { type: Boolean, required: true, default: false },
  discussionForumTab: { type: Boolean, required: true, default: false },
  organizationsTab: { type: Boolean, required: true, default: false },
  resourcesView: { type: Boolean, required: true, default: false },
  discussionForumView: { type: Boolean, required: true, default: false },
});

mongoose.model('Onboarding', OnboardingSchema);
module.exports = OnboardingSchema;
