const debug = require('debug')('app:routes:v1');
const express = require('express');

debug('configuring routes');

const router = express.Router();

const getRoute = name => require(`./${name}`);

router.use('/auth', getRoute('auth'));
router.use('/users', getRoute('users'));
router.use('/day-cares', getRoute('dayCares'));
router.use('/classes', getRoute('class'));

module.exports = router;
