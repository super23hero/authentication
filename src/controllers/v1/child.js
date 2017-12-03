const debug = require('debug')('app:controllers:v1:child');

const ChildService = require('../../services/v1/child');

const ChildController = {

  /**
   * @api {get} /v1/child/ List Children
   * @apiVersion 1.0.0
   * @apiName ListChildren
   * @apiGroup Child
   * @apiPermission admin
   *
   * @apiDescription Lists all children
   *
   * @apiExample Example usage:
   * curl -i http://localhost:3000/v1/children
   *
   * @apiSuccess {Object[]} children Array of children
   */
  list: async (req, res, next) => {
    debug('list action');

    try {
      const children = await ChildService.list(req.query);
      res.status(200).send(children);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {get} /v1/children/:id Find child by id
   * @apiVersion 1.0.0
   * @apiName GetChild
   * @apiGroup Child
   * @apiPermission user
   *
   * @apiDescription Finds an child by its id.
   *
   * @apiExample Example usage:
   * curl -X GET http://localhost:3000/v1/child/597168b5f780cc3a48cf6215
   *
   * @apiParam    {String}    name          Child name.
   *
   * @apiSuccess  {String}  _id             Child id.
   * @apiSuccess  {String}  name            Child name.
   * @apiSuccess  {String}  nickname        Child nickname.
   * @apiSuccess  {String}  sex             Child sex.
   * @apiSuccess  {Number}  age             Child age.
   * @apiSuccess  {Class}   class           Child class.
   * @apiSuccess  {String}  photo           Child photo.
   * @apiSuccess  {Object}  shoe            Child shoe.
   * @apiSuccess  {String}  shoe.status     Child shoe status.
   * @apiSuccess  {String}  shoe.size       Child shoe size.
   * @apiSuccess  {Object}  cloth           Child cloth.
   * @apiSuccess  {String}  cloth.status    Child cloth status.
   * @apiSuccess  {String}  cloth.size      Child cloth size.
   * @apiSuccess  {Object}  toy             Child toy.
   * @apiSuccess  {String}  toy.status      Child toy status.
   * @apiSuccess  {String}  toy.wish        Child toy wish.
   * @apiSuccess  {String}  creation_date   Child creation date.
   */
  findById: async (req, res, next) => {
    debug('find child by id');

    const { id } = req.params;

    try {
      const entity = await ChildService.findById(id);
      res.status(200).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {post} /v1/children/ Create child
   * @apiVersion 1.0.0
   * @apiName CreateChild
   * @apiGroup Child
   * @apiPermission admin
   *
   * @apiDescription Creates a new child.
   *
   * @apiExample Example usage:
   * curl -X POST http://localhost:3000/v1/children -d name=myenv
   *
   * @apiParam    {String}    name          Child name.
   *
   * @apiSuccess  {String}  _id             Child id.
   * @apiSuccess  {String}  name            Child name.
   * @apiSuccess  {String}  nickname        Child nickname.
   * @apiSuccess  {String}  sex             Child sex.
   * @apiSuccess  {Number}  age             Child age.
   * @apiSuccess  {String}  class           Child class id.
   * @apiSuccess  {String}  photo           Child photo.
   * @apiSuccess  {Object}  shoe            Child shoe.
   * @apiSuccess  {String}  shoe.status     Child shoe status.
   * @apiSuccess  {String}  shoe.size       Child shoe size.
   * @apiSuccess  {Object}  cloth           Child cloth.
   * @apiSuccess  {String}  cloth.status    Child cloth status.
   * @apiSuccess  {String}  cloth.size      Child cloth size.
   * @apiSuccess  {Object}  toy             Child toy.
   * @apiSuccess  {String}  toy.status      Child toy status.
   * @apiSuccess  {String}  toy.wish        Child toy wish.
   * @apiSuccess  {String}  creation_date   Child creation date.
   */
  create: async (req, res, next) => {
    debug('create action');

    const { body } = req;

    try {
      const entity = await ChildService.create(body);
      res.status(201).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {put} /v1/children/:id Update child
   * @apiVersion 1.0.0
   * @apiName UpdateChild
   * @apiGroup Child
   * @apiPermission user
   *
   * @apiDescription Updates an child.
   *
   * @apiParam    {String}    name          Child name.
   *
   * @apiExample Example usage:
   * curl -X PUT http://localhost:3000/v1/children/12345 -d myvar=myvalue
   */
  update: async (req, res, next) => {
    debug('update action');

    const { params, body } = req;

    try {
      const entity = await ChildService.update(params.id, body);
      res.status(200).send(entity);
    } catch (err) {
      next(err);
    }
  },

  /**
   * @api {delete} /v1/children/:id Delete child
   * @apiVersion 1.0.0
   * @apiName DeleteChild
   * @apiGroup Child
   * @apiPermission user
   *
   * @apiDescription Deletes an child.
   *
   * @apiParam {String} id Child id.
   *
   * @apiExample Example usage:
   * curl -X DELETE http://localhost:3000/v1/children/12345
   */
  delete: async (req, res, next) => {
    debug('delete action');

    const { params } = req;

    try {
      await ChildService.delete(params.id);
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = ChildController;
