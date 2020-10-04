const mongoose = require('mongoose');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const USER_ROLES = [
  'admin', // Full access
  'mod', // e.g. AI Global Employee
  'member', // Normal member
];

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  role: { type: String, default: 'member', enum: USER_ROLES },
  hashedPassword: { type: String, default: '' },
  salt: { type: String, required: true },
  orgs: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: [] },
  ],
});

UserSchema.virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainPass) {
    return this.encryptPassword(plainPass) === this.hashedPassword;
  },

  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + '';
  },

  encryptPassword: function (password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex');
    } catch (err) {
      return '';
    }
  },

  toPrivateJSON: function () {
    let { _id, email, name, username, role } = this;
    return { _id, email, name, username, role };
  },
};

UserSchema.statics = {
  load: function (options, cb) {
    options.select = options.select || 'name username';
    return this.findOne(options.criteria).select(options.select).exec(cb);
  },
};

mongoose.model('User', UserSchema);
module.exports = UserSchema;
