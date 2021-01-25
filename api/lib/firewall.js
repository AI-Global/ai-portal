const ACCESS_LEVELS = ['public', 'user', 'owner', 'mod', 'admin'];

let firewall = async (req, rules) => {
  let fields = Object.keys(
    Object.assign({}, req.body || {}, req.query || {}, req.params || {})
  );
  let role = 'public';
  let isValid = rules[role] && fields.every((f) => rules[role].includes(f));
  if (!isValid) {
    console.log('FIREWALL ACCESS DENIED');
  }
  console.log(fields, rules, req.path);
  return isValid;
};

let cleanRules = (rules) => {
  for (let level of ACCESS_LEVELS) {
    if (!(level in rules) && 'public' in rules) {
      rules[level] = rules['public'];
    }
  }
};

let protect = (method, app, endpoint, endpointHandler, rules) => {
  cleanRules(rules);
  app[method.toLowerCase()](endpoint, async (req, res) => {
    if (await firewall(req, rules)) {
      return endpointHandler(req, res);
    }
    return res.json({ errors: [{ msg: 'Request was blocked.' }] });
  });
};

module.exports = (app) => {
  let firewalledApp = {};
  for (let method of ['get', 'put', 'post', 'delete', 'patch']) {
    firewalledApp[method] = (endpoint, endpointHandler, rules) =>
      protect(method, app, endpoint, endpointHandler, rules || {});
  }
  return firewalledApp;
};
