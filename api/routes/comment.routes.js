const commentUtil = require('../models/comment.util');
module.exports = app => {
  const firewall = require('../lib/firewall')(app);
  firewall.get(
    '/api/comments/:commentId',
    async (req, res) => {
      const { commentId } = req.params;
      const result = await commentUtil.get(commentId);
      res.json(commentUtil.toJSON(result));
    },
    { public: ['commentId'] }
  );
  firewall.post(
    '/api/comments',
    async (req, res) => {
      const { resourceId, text, timestamp } = req.body;
      await commentUtil.create(
        await req.getUser(),
        text,
        timestamp,
        resourceId
      );
      res.send({ status: 200 });
    },
    { public: ['resourceId', 'text', 'timestamp'] }
  );
  firewall.delete(
    '/api/comments',
    async (req, res) => {
      const { commentId } = req.body;

      await commentUtil.delete(commentId);
    },
    { owner: ['_id'], mod: ['_id'], public: ['resourceId', 'commentId'] }
  );
  firewall.post(
    '/api/comments/add-reply',
    async (req, res) => {
      const { parentID, replyText, resId } = req.body;

      await commentUtil.addReply(
        parentID,
        await req.getUser(),
        replyText,
        Date.now(),
        resId
      );
    },
    { owner: ['_id'], mod: ['_id'], public: ['resId', 'replyText', 'parentID'] }
  );
};
