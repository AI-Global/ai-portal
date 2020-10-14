const mongoose = require('mongoose');
const topic = require('./topic.model');
const file = require('./file.model');
const { RESOURCE_TYPES, RESOURCE_PATHS } = require('./enums');

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  type: { type: String, enum: RESOURCE_TYPES, required: true },
  path: { type: String, enum: RESOURCE_PATHS },
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      default: [],
      required: true,
    },
  ],
  uploadDate: { type: Date, default: Date.now },
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  licenseName: { type: String, default: 'Unknown' },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      default: [],
    },
  ],
  technical: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  trustIndexCategories: { type: Array, default: [] },
  fundedBy: { type: String, default: '' },
  creator: { type: String, default: '' },
  dataDictLink: { type: String, default: '' },
  sensitiveData: { type: String, default: '' },
  qualityReview: { type: String, default: '' },
  ethicsReview: { type: String, default: '' },
  usage: { type: String, default: '' },
  isConfidential: { type: Boolean, default: false },
  offensiveContent: { type: String, default: '' },
  numInstances: { type: Number, default: 1 },
  instances: { type: Array, default: [] },
  label: { type: String, default: '' },
  rawData: { type: String, default: '' },
  distribution: { type: String, default: '' },
  personalInfoRemoved: { type: String, default: '' },
  privacyProcedure: { type: String, default: '' },
  individualsIdentified: { type: Boolean, default: false },
  noiseDescription: { type: String, default: '' },
  externalRestrictions: { type: String, default: '' },
});

ResourceSchema.methods = {
  toJSON: function () {
    let { _id, name, type, desc } = this;
    return { _id, name, type, desc };
  },
};

mongoose.model('Resource', ResourceSchema);
module.exports = ResourceSchema;
