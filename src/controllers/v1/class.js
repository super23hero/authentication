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

  /**
   * @api {get} /v1/classes/:id Find day care class by id
   * @apiVersion 1.0.0
   * @apiName GetClass
   * @apiGroup Class
   * @apiPermission user
   *
   * @apiDescription Finds an day care class by its id.
   *
   * @apiExample Example usage:
   * curl -X GET http://localhost:3000/v1/classes/597168b5f780cc3a48cf6215
   *
   * @apiParam    {String}    name          Class name.
   *
   * @apiSuccess  {String}  _id             Class id.
   * @apiSuccess  {String}  name            Class name.
   * @apiSuccess  {String}  creation_date   Class creation date.
   */
  findById: async (req, res, next) => {
    debug('find class by id');

    const { id } = req.params;

    try {
      const entity = await ClassService.findById(id);
      res.status(200).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {post} /v1/classes/ Create class
   * @apiVersion 1.0.0
   * @apiName CreateClass
   * @apiGroup Class
   * @apiPermission admin
   *
   * @apiDescription Creates a new class.
   *
   * @apiExample Example usage:
   * curl -X POST http://localhost:3000/v1/classes -d name=myenv
   *
   * @apiParam    {String}    name          Class name.
   *
   * @apiSuccess  {String}  _id             Class id.
   * @apiSuccess  {String}  name            Class name.
   * @apiSuccess  {String}  creation_date   Class creation date.
   */
  create: async (req, res, next) => {
    debug('create action');

    const { body } = req;

    try {
      const entity = await ClassService.create(body);
      res.status(201).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {put} /v1/classes/:id Update class
   * @apiVersion 1.0.0
   * @apiName UpdateClass
   * @apiGroup Class
   * @apiPermission user
   *
   * @apiDescription Updates an class.
   *
   * @apiParam    {String}    name          Class name.
   *
   * @apiExample Example usage:
   * curl -X PUT http://localhost:3000/v1/classes/12345 -d myvar=myvalue
   */
  update: async (req, res, next) => {
    debug('update action');

    const { params, body } = req;

    try {
      const entity = await ClassService.update(params.id, body);
      res.status(200).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {delete} /v1/classes/:id Delete class
   * @apiVersion 1.0.0
   * @apiName DeleteClass
   * @apiGroup Class
   * @apiPermission user
   *
   * @apiDescription Deletes an class.
   *
   * @apiParam {String} id Class id.
   *
   * @apiExample Example usage:
   * curl -X DELETE http://localhost:3000/v1/classes/12345
   */
  delete: async (req, res, next) => {
    debug('delete action');

    const { params } = req;

    try {
      await ClassService.delete(params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ClassController;
