const debug = require('debug')('app:controllers:v1:class');

const ClassService = require('../../services/v1/class');

const ClassController = {

  /**
   * @api {get} /v1/classes/ List Day Care Classes
   * @apiVersion 1.0.0
   * @apiName ListClasses
   * @apiGroup Class
   * @apiPermission admin
   *
   * @apiDescription Lists all day cares classes
   *
   * @apiExample Example usage:
   * curl -i http://localhost:3000/v1/classes
   *
   * @apiSuccess {Object[]} classes Array of classes
   */
  list: async (req, res, next) => {
    debug('list action');

    const { fields, limit, skip, sort } = req.params;

    try {
      const classes = await ClassService.list({
        criteria: {},
        fields,
        limit: Number(limit) || null,
        skip: Number(skip) || null,
        sort,
      });
      res.status(200).send(classes);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ClassController;
