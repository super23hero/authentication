const debug = require('debug')('app:routes:v1:child');
const express = require('express');

debug('configuring children routes');

const router = express.Router();

const AuthMiddleware = require('../../middlewares/auth');
const ChildController = require('../../controllers/v1/child');

router.route('/')
  .get(ChildController.list)
  .post(AuthMiddleware.isAuthenticated, ChildController.create);

router.use(AuthMiddleware.isAuthenticated);

router.route('/:id')
  .get(ChildController.findById)
  .put(AuthMiddleware.isAuthenticated, ChildController.update)
  .delete(AuthMiddleware.isAuthenticated, ChildController.delete);

module.exports = router;
