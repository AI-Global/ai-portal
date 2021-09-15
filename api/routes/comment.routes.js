const commentUtil = require('../models/comment.util');
module.exports = app => {
  const firewall = require('../lib/firewall')(app);
  firewall.get(
    '/api/comments/:commentId',
    async (req, res) => {
      const { commentId } = req.params;
      const result = await commentUtil.get(commentId);
      let response = commentUtil.toJSON(result);
      response.status = 200;
      res.json(response);
    },
    { public: ['commentId'] }
  );
  firewall.post(
    '/api/comments',
    async (req, res) => {
      const { discussionPost, resourceId, text, timestamp } = req.body;
      await commentUtil.create(
        await req.getUser(),
        discussionPost,
        text,
        timestamp,
        resourceId
      );
      res.send({ status: 200 });
    },
    { public: ['discussionPost', 'resourceId', 'text', 'timestamp'] }
  );
  firewall.delete(
    '/api/comments/:commentId/:userId',
    async (req, res) => {
      const { commentId, userId } = req.params;
      await commentUtil.delete(commentId, userId);
      res.send({ status: 200 });
    },
    {
      public: ['userId', 'commentId'],
    }
  );
  firewall.post(
    '/api/comments/add-reply',
    async (req, res) => {
      const { discussionPost, parentID, replyText, resId } = req.body;

      await commentUtil.addReply(
        parentID,
        discussionPost,
        await req.getUser(),
        replyText,
        Date.now(),
        resId
      );
      res.send({ status: 200 });
    },
    { owner: ['_id'], mod: ['_id'], public: ['discussionPost', 'resId', 'replyText', 'parentID'] }
  );
};
