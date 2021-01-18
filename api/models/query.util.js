exports.searchQuery = (
  model,
  { queryFields, anyFields, sorts },
  query,
  fields
) => {
  let searchSpecs = [];
  if (query) {
    searchSpecs.push({
      $or: queryFields.map((name) => ({
        [name]: { $regex: query, $options: 'i' },
      })),
    });
  }
  for (let field of anyFields) {
    let val = fields[field];
    if (!val) {
      continue;
    }
    val = val.trim().split(',');
    searchSpecs.push({ [field]: { $in: val } });
  }
  let findOpts = {};
  if (searchSpecs.length > 0) {
    findOpts = { $and: searchSpecs };
  }
  let sort = [Object.values(sorts)[0]];
  if (fields.sortBy) {
    let usedSorts = fields.sortBy
      .trim()
      .split(',')
      .filter((s) => s in sorts);
    sort = usedSorts.map((sortName) => sorts[sortName]);
  }
  return model.find(findOpts).sort(sort);
};

exports.execUpdateQuery = async (
  model,
  { setParams, setRefFuncs },
  object,
  params
) => {
  let updateParams = {};
  for (let param of setParams) {
    if (param in params) {
      updateParams[param] = params[param];
    }
  }
  for (let param in setRefFuncs) {
    if (param in params) {
      let refObjs = params[param];
      if (refObjs.length > 0 && typeof refObjs[0] === 'string') {
        refObjs = refObjs.map((refId) => ({ _id: refId }));
      }
      object = await setRefFuncs[param](object, refObjs);
    }
  }
  let objUpdated = await model
    .update({ _id: object._id }, { $set: updateParams }, { new: true })
    .exec();
  return objUpdated;
};
