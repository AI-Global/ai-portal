const userUtil = require('../models/user.util');
const searchUtil = require('../models/search.util');
const resourceUtil = require('../models/resource.util');

module.exports = (app) => {
  app.get('/api/resources', async (req, res) => {
    let { query } = req.query;
    let resources = await resourceUtil.search(query);
    await searchUtil.create(query);
    res.json(resources);
  });
};
