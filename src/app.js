if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line import/no-extraneous-dependencies
  require('@glimpse/glimpse').init();
}

const debug = require('debug')('app');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

debug('bootstrapping application');

const config = require('./config');
const routes = require('./routes');

const app = express();

app.use(morgan(config.env.HTTP_LOG_CONFIG, { stream: config.logger.stream }));
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(config.passport.initialize());
app.use(routes);

config.mongoose.connection.on('connected', () => app.emit('ready'));
config.mongoose.connection.on('error', err => app.emit('error', err));

module.exports = app;