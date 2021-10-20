const onboardingUtil = require('../models/onboarding.util');
module.exports = (app) => {
  const firewall = require('../lib/firewall')(app);
  firewall.post(
    '/api/onboarding',
    async (req, res) => {
      const { userId, tooltipName = null } = req.body;
      if (tooltipName) {
        await onboardingUtil.edit(userId, tooltipName);
      } else {
        await onboardingUtil.editAll(userId);
      }
      res.send({ status: 200 });
    },
    { public: ['userId', 'tooltipName'] }
  );
  firewall.get(
    '/api/onboarding',
    async (req, res) => {
      const { userId, tooltipName } = req.query;
      const visited = await onboardingUtil.get(userId, tooltipName);
      res.send({ data: visited });
    },
    { public: ['userId', 'tooltipName'] }
  );
};
