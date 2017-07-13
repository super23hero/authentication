const logger = require('./logger');
const env = require('./env');
const mongoose = require('mongoose');

// Connect to our Database and handle an bad connections
mongoose.connect(env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  logger.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// import all of our models
require('../models/User');
