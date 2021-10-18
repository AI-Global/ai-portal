const onboardingUtil = require('../models/onboarding.util');
module.exports = app => {
  const firewall = require('../lib/firewall')(app);
  firewall.post(
    '/api/onboarding',
    async (req, res) => {
      const { userId, tooltipName } = req.body;
      await onboardingUtil.edit(userId, tooltipName);
      res.send({ status: 200 });
    },
    { public: ['userId', 'tooltipName'] }
  );
};
