const discussionUtil = require('../models/discussionpost.util');

module.exports = app => {
  const firewall = require('../lib/firewall')(app);
  firewall.get(
    '/api/discussionposts/:discussionId',
    async(req, res) => {
      const { discussionId } = req.params;
      const result = await discussionUtil.get(discussionId);
      res.json(discussionUtil.toJSON(result));
    },
    { public: ['discussionId'] }
  );
  firewall.post(
    '/api/discussionposts',
    async (req, res) => {
      const { text } = req.body;
      await discussionUtil.create(
        await req.getUser(),
        text,
        Date.now()
      );
    },
    { public: ['text'] }
  );
  firewall.delete(
    '/api/discussionposts',
    async (req, res) => {
      const { discussionId } = req.body;

      await discussionUtil.delete(discussionId);
    },
    { owner: ['_id'], mod: ['_id'], public: ['discussionId'] }
  );
  firewall.post(
    '/api/discussionposts/add-reply',
    async (req, res) => {
      const { replyText, discussionId } = req.body;

      await commentUtil.addReply(
        await req.getUser(),
        replyText,
        Date.now(),
        discussionId
      );
    },
    { owner: ['_id'], mod: ['_id'], public: ['replyText', 'discussionId'] }
  );
}