const debug = require('debug')('app:routes:v1:user');
const express = require('express');

debug('configuring day cares routes');

const router = express.Router();

const AuthMiddleware = require('../../middlewares/auth');
const DayCareController = require('../../controllers/v1/dayCare');

router.use(AuthMiddleware.isAuthenticated);

router.route('/')
  .get(AuthMiddleware.isAdmin, DayCareController.list)
  .post(AuthMiddleware.isAdmin, DayCareController.create);

router.route('/:id')
  .get(DayCareController.findById)
  .put(DayCareController.update)
  .delete(DayCareController.delete);

module.exports = router;
