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
