const debug = require('debug')('app:routes:v1:child');
const express = require('express');

debug('configuring children routes');

const router = express.Router();

const AuthMiddleware = require('../../middlewares/auth');
const ChildController = require('../../controllers/v1/child');

router.use(AuthMiddleware.isAuthenticated);

router.route('/')
  .get(AuthMiddleware.isAdmin, ChildController.list)
  .post(AuthMiddleware.isAdmin, ChildController.create);

router.route('/:id')
  .get(ChildController.findById)
  .put(ChildController.update)
  .delete(ChildController.delete);

module.exports = router;
