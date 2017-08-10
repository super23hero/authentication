const debug = require('debug')('app:config:mongoose');
const mongoose = require('mongoose');
const logger = require('./logger');
const env = require('./env');
const User = require('../models/v1/user');

const url = env.DATABASE;

debug(`configuring mongoose connection to ${url}`);

mongoose.set('debug', env.NODE_ENV !== 'production');

mongoose.connect(url, { server: { reconnectTries: Number.MAX_VALUE } });

mongoose.Promise = Promise;

mongoose.connection.on('connected', () => logger.info(`Mongoose default connection open to ${url}`));

mongoose.connection.on('error', err => logger.error(`Mongoose default connection error: ${err}`));

mongoose.connection.on('disconnected', () => logger.info('Mongoose default connection disconnected'));

mongoose.connection.once('open', async () => {
  logger.info('Mongoose default connection is open');
  const count = await User.count({});
  if (count > 0) return;
  debug('creating "admin" user since there\'s no users in the database');

  new User({ name: 'Administrator', email: 'daniel.kuroski@gmail.com', username: 'involves', password: 'admin', isAdmin: true }).save();
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    logger.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = mongoose;
