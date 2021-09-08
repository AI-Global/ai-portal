const mongoose = require('mongoose');
const topic = require('./topic.model');
const file = require('./file.model');
const { RESOURCE_TYPES, RESOURCE_PATHS, AI_SYSTEM_TYPES } = require('./enums');

const Schema = mongoose.Schema;

const ResourceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  desc: { type: String, required: true },
  type: [{ type: String, enum: RESOURCE_TYPES }],
  path: [{ type: String, enum: RESOURCE_PATHS }],
  keywords: [{ type: String }],
  uploadDate: { type: Date, default: Date.now },
  creationDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date, default: Date.now },
  licenseName: { type: String, default: 'Unknown' },
  downloadURL: { type: String },
  logoURL: { type: String, default: '/demo/rai-other.png' },
  technical: { type: Boolean, default: false },
  featured: { type: Boolean, default: false },
  trustIndexCategories: { type: [String], default: [] },
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
  instances: { type: [String], default: [] },
  label: { type: String, default: '' },
  rawData: { type: String, default: '' },
  distribution: { type: String, default: '' },
  personalInfoRemoved: { type: String, default: '' },
  privacyProcedure: { type: String, default: '' },
  individualsIdentified: { type: Boolean, default: false },
  noiseDescription: { type: String, default: '' },
  externalRestrictions: { type: String, default: '' },
  reviewsRemaining: { type: [String], default: ['mod'] },
  aiSystemTypes: [{ type: String, enum: AI_SYSTEM_TYPES, default: [] }],
  version: { type: String, default: '' },
  updateFrequency: { type: String, default: '' },
  purpose: { type: String, default: '' },
  unintendedUse: { type: String, default: '' },
  ownerEmail: { type: String, default: '' },
  location: { type: String, default: '' },
  missingInfo: { type: String, default: '' },
  audience: { type: String, default: '' },
  removalRequest: { type: String, default: '' },
  dataset: {
    collectorOwnerRelation: { type: String, default: '' },
    collectionProcess: { type: String, default: '' },
    infoCollected: { type: String, default: '' },
    accessPermissions: { type: String, default: '' },
    tasks: { type: String, default: '' },
    populationDemographics: { type: String, default: '' },
    consentProcedures: { type: String, default: '' },
    fieldsRelationship: { type: String, default: '' },
    instanceRepresentation: { type: String, default: '' },
    multipleInstanceTypes: { type: String, default: '' },
    completeness: { type: String, default: '' },
    isSample: { type: Boolean, default: false },
    sampleStrategy: { type: String, default: '' },
    populationDataSource: { type: String, default: '' },
    sampleCoverage: { type: String, default: '' },
    recommendedSplit: { type: String, default: '' },
    carefulHandling: { type: String, default: '' },
    accurateUserRepresentation: { type: String, default: '' },
    rawOrProcessed: { type: String, default: '' },
    driftProtection: { type: String, default: '' },
    reusedOrReinterpreted: { type: String, default: '' },
    lifeCycleState: { type: String, default: '' },
    selfContainmen: { type: String, default: '' },
    stabilityOverTime: { type: String, default: '' },
    archivalVersions: { type: String, default: '' },
    externalResourcesRestrictions: { type: String, default: '' },
  },
  model: {
    modelType: { type: String, default: '' },
    inputs: { type: String, default: '' },
    outputs: { type: String, default: '' },
    limitations: { type: String, default: '' },
    hyperparameters: { type: String, default: '' },
    architecture: { type: String, default: '' },
    taskType: { type: String, default: '' },
    learningType: { type: String, default: '' },
    numParameters: { type: String, default: '' },
    attributes: { type: String, default: '' },
    framework: { type: String, default: '' },
    libraryDependencies: { type: String, default: '' },
    hardware: { type: String, default: '' },
    otherPretrainedModels: { type: String, default: '' },
    metrics: { type: String, default: '' },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  files: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'File',
      default: [],
    },
  ],
  topics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
      default: [],
    },
  ],
  organizations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Organization',
      default: [],
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      default: [],
    },
  ],
});

mongoose.model('Resource', ResourceSchema);
module.exports = ResourceSchema;
