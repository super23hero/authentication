const debug = require('debug')('app:controllers:v1:dayCare');

const DayCareService = require('../../services/v1/dayCare');

const DayCareController = {

  /**
   * @api {get} /v1/day-cares/ List day cares
   * @apiVersion 0.1.0
   * @apiName ListDayCares
   * @apiGroup DayCare
   * @apiPermission users
   *
   * @apiDescription Lists all day cares.
   *
   * @apiExample Example usage:
   * curl -i http://localhost:3000/v1/day-cares
   *
   * @apiSuccess {Object[]} data
   * @apiSuccess {String} data._id
   * @apiSuccess {String} data.name
   * @apiSuccess {Date} data.creation_date
   */
  list: async (req, res, next) => {
    debug('list action');

    const { fields, limit, skip, sort } = req.params;

    try {
      const dayCares = await DayCareService.list({
        criteria: {},
        fields,
        limit: Number(limit) || null,
        skip: Number(skip) || null,
        sort,
      });
      res.status(200).send({ data: dayCares });
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {get} /v1/day-cares/:id Find day care by id
   * @apiVersion 1.0.0
   * @apiName GetDayCare
   * @apiGroup DayCare
   * @apiPermission user
   *
   * @apiDescription Finds an day care by its id.
   *
   * @apiExample Example usage:
   * curl -X GET http://localhost:3000/v1/day-cares/597168b5f780cc3a48cf6215
   *
   * @apiParam    {String}    name          DayCare name.
   *
   * @apiSuccess  {String}  _id             DayCare id.
   * @apiSuccess  {String}  name            DayCare name.
   * @apiSuccess  {String}  creation_date   DayCare creation date.
   */
  findById: async (req, res, next) => {
    debug('find day care by id');

    const { id } = req.params;

    try {
      const dayCare = await DayCareService.findById(id);
      res.status(200).send(dayCare);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {post} /v1/day-cares/ Create day care
   * @apiVersion 1.0.0
   * @apiName CreateDayCare
   * @apiGroup DayCare
   * @apiPermission admin
   *
   * @apiDescription Creates a new day care.
   *
   * @apiExample Example usage:
   * curl -X POST http://localhost:3000/v1/user -d name=myenv
   *
   * @apiParam    {String}    name          DayCare name.
   *
   * @apiSuccess  {String}  _id             DayCare id.
   * @apiSuccess  {String}  name            DayCare name.
   * @apiSuccess  {String}  creation_date   DayCare creation date.
   */
  create: async (req, res, next) => {
    debug('create action');

    const { body } = req;

    try {
      const dayCare = await DayCareService.create(body);
      res.status(201).send(dayCare);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {put} /v1/day-cares/:id Update day care
   * @apiVersion 1.0.0
   * @apiName UpdateDayCare
   * @apiGroup DayCare
   * @apiPermission user
   *
   * @apiDescription Updates an day care.
   *
   * @apiParam    {String}    name          DayCare name.
   *
   * @apiExample Example usage:
   * curl -X PUT http://localhost:3000/v1/day-cares/12345 -d myvar=myvalue
   */
  update: async (req, res, next) => {
    debug('update action');

    const { params, body } = req;

    try {
      const dayCare = await DayCareService.update(params.id, body);
      res.status(200).send(dayCare);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {delete} /v1/day-cares/:id Delete day care
   * @apiVersion 1.0.0
   * @apiName DeleteDayCare
   * @apiGroup DayCare
   * @apiPermission user
   *
   * @apiDescription Deletes an day care.
   *
   * @apiParam {String} id DayCare id.
   *
   * @apiExample Example usage:
   * curl -X DELETE http://localhost:3000/v1/day-cares/12345
   */
  delete: async (req, res, next) => {
    debug('delete action');

    const { params } = req;

    try {
      await DayCareService.delete(params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = DayCareController;
