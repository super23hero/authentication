const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const SALT_COMPLEXITY = 10;
mongoose.Promise = global.Promise;

const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    unique: 'Given email is already in use',
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'User [password] field is required'],
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  creation_date: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.virtual('gravatar').get(function () {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

UserSchema.pre('save', function preSave(next) {
  const user = this;
  if (!user.isModified) return next();

  bcrypt.genSalt(SALT_COMPLEXITY, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next();

      user.password = hash;
      next();
    });
  });
});

UserSchema.post('validate', (doc) => {
  if (doc.isNew) {
    doc.creation_date = new Date();
  }
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  const user = this;
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, user.password, (err, isMatch) => {
      if (err) return reject(err);
      resolve(isMatch);
    });
  });
};

UserSchema.plugin(beautifyUnique);
UserSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
UserSchema.plugin(mongodbErrorHandler);

const User = mongoose.model('User', UserSchema);

module.exports = User;
