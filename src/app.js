const debug = require('debug')('app');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const helmet = require('helmet');
const cors = require('cors');

debug('bootstrapping application');

const config = require('./config');
const logger = require('./config/logger');
const routes = require('./routes');

const app = express();

app.use(morgan(config.env.HTTP_LOG_CONFIG, { stream: logger.stream }));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: config.env.SECRET,
  key: config.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// Passport JS is what we use to handle our logins
app.use(config.passport.initialize());

app.use(routes);

config.mongoose.connection.on('connected', () => app.emit('ready'));
config.mongoose.connection.on('error', err => app.emit('error', err));

module.exports = app;
