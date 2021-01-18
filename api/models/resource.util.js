const mongoose = require('mongoose');
const Resource = mongoose.model('Resource');
const Organization = mongoose.model('Organization');
const queryUtil = require('./query.util');

exports.Resource = Resource;

let populate = (resourceQuery) => {
  return resourceQuery
    .populate('organizations', '-__v -organizations')
    .populate('topics', '-__v -topics')
    .populate('files', '-__v -files');
};

exports.search = async (query, fields) => {
  if (fields.organizationType) {
    let orgs = await Organization.find({
      type: fields.organizationType,
    }).select('id');
    fields.organizations = orgs.map((org) => org._id).join(',');
  }
  let result = queryUtil.searchQuery(
    Resource,
    {
      queryFields: ['name', 'desc'],
      anyFields: ['topics', 'organizations', 'type', 'path'],
      sorts: { byNameAsc: ['name', 1], byUploadDateAsc: ['uploadDate', 1] },
    },
    query,
    fields
  );
  return await populate(result);
};

exports.create = async (params) => {
  let resource = new Resource(params);
  await resource.save();
  return resource;
};

exports.update = async (resource, params) => {
  let { topics, files, organizations, _id, __v, ...cleanParams } = params;
  return await Resource.update(
    { _id: resource._id },
    { $set: cleanParams }
  ).exec();
};

exports.toJSON = (resource) => {
  return JSON.parse(JSON.stringify(resource));
};

exports.getById = async (id) => {
  return await populate(Resource.findById(id));
};

exports.addTopic = async (resource, tag) => {
  return await Resource.findByIdAndUpdate(
    resource._id,
    { $addToSet: { topics: tag._id } },
    { new: true, useFindAndModify: false }
  );
};

exports.addOrganization = async (resource, org) => {
  let updatedResource = await Resource.findByIdAndUpdate(
    resource._id,
    { $addToSet: { organizations: org._id } },
    { new: true, useFindAndModify: false }
  );
  await Organization.findByIdAndUpdate(
    org._id,
    { $addToSet: { resources: resource._id } },
    { new: true, useFindAndModify: false }
  );
  return updatedResource;
};
