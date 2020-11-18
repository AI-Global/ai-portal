module.exports.subject = ({}) => `AI Global Portal: Password Reset`;
module.exports.text = ({ resetURL }) =>
  `You have requested your password on AI Global to be reset. Visit ${resetURL} to reset your password.`;
module.exports.html = ({ resetURL }) =>
  `<strong>You have requested your password on AI Global to be reset. Visit ${resetURL} to reset your password.<strong>`;
