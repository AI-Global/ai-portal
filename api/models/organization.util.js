const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');
const queryUtil = require('./query.util');

exports.Organization = Organization;

exports.search = async (query, fields) => {
  let result = queryUtil.searchQuery(
    Organization,
    {
      queryFields: ['name', 'desc', 'url'],
      anyFields: ['type'],
      sorts: { byNameAsc: ['name', 1] },
    },
    query,
    fields
  );
  return await result;
};

exports.create = async (params) => {
  let organization = new Organization(params);
  await organization.save();
  return organization;
};

exports.getAll = async () => {
  return await Organization.find();
};

exports.toJSON = (organization) => {
  return JSON.parse(JSON.stringify(organization));
};

exports.getByName = async (name) => {
  return await Organization.findOne({ name: name });
};

exports.getById = async (id) => {
  return await Organization.findById(id);
};

exports.update = async (organization, params) => {
  let { _id, __v, ...cleanParams } = params;
  return await Organization.update(
    { _id: organization._id },
    { $set: cleanParams }
  ).exec();
};

exports.getResources = async (org) => {
  let { resources } = await Organization.findById(org._id).populate(
    'resources',
    '-_id -__v -resources'
  );
  return resources;
};

exports.delete = async (id) => {
  return await Organization.deleteOne(id);
};
