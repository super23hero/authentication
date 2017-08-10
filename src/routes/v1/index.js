const debug = require('debug')('app:routes:v1');
const express = require('express');

debug('configuring routes');

const router = express.Router();

const auth = require('./auth');
const user = require('./user');
const example = require('./example');

router.use('/auth', auth);
router.use('/user', user);
router.use('/example', example);

module.exports = router;
