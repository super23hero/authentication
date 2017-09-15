const debug = require('debug')('app:routes:v1:class');
const express = require('express');

debug('configuring classes routes');

const router = express.Router();

const AuthMiddleware = require('../../middlewares/auth');
const ClassController = require('../../controllers/v1/class');

router.use(AuthMiddleware.isAuthenticated);

router.route('/')
  .get(AuthMiddleware.isAdmin, ClassController.list);

module.exports = router;
