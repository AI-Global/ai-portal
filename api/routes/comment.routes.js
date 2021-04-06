const commentUtil = require('../models/comment.util');
module.exports = app => {
  const firewall = require('../lib/firewall')(app);
  firewall.get(
    '/api/comments/:commentId',
    async (req, res) => {
      const { commentId } = req.params;
      const result = await commentUtil.getCommentsForResource(commentId);
      res.json(commentUtil.toJson(result));
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
    },
    { public: ['resourceId', 'text', 'timestamp'] }
  );
  firewall.delete(
    '/api/comments/:commentId/:userId',
    async (req, res) => {
      const { commentId, userId } = req.params;
      await commentUtil.delete(commentId, userId);
    },
    {
      public: ['userId', 'commentId'],
    }
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
    { owner: ['_id'], mod: ['_id'], public: ['resourceId', 'commentId'] }
  );
};
