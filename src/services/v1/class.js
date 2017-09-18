const debug = require('debug')('app:services:v1:class');
const _ = require('lodash');

const NotFoundError = require('../../errors/notFound');
const ClassSchema = require('../../models/v1/class');

const ClassService = {

  /**
   *
   * @return {Promise|Array|{index: number, input: string}|*}
   */
  list: (query) => {
    debug('listing classes');

    const { criteria, fields, limit, skip, sort } = query;

    return ClassSchema.find(criteria, fields)
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .exec();
  },

  /**
   *
   * @param {Object} criteria
   * @return {Promise}
   */
  findOne: async (criteria) => {
    return ClassSchema.findOne(criteria).exec();
  },

  /**
   *
   * @param id
   * @return {Promise}
   */
  findById: async (id) => {
    debug(`retrieving day care "${id}"`);

    const entity = await ClassSchema.findOne({ _id: id }).exec();
    if (!entity) throw new NotFoundError(`day care "${id}" not found`);

    return entity.populate('day_care').execPopulate();
  },

  /**
   *
   * @param body
   * @return {Promise.<void>}
   */
  create: async (body) => {
    debug(`creating day care "${body.name}"`);

    const entity = new ClassSchema(body);
    await entity.save();
    return entity;
  },

  /**
   *
   * @param id
   * @param body
   * @return {Promise.<*|Promise>}
   */
  update: async (id, body) => {
    debug(`updating day care "${id}"`);

    const entity = await ClassService.findById(id);
    await _.merge(entity, body).save();
    return entity;
  },

  /**
   *
   * @param id
   * @return {Promise.<Promise|Array|{index: number, input: string}|*>}
   */
  delete: async (id) => {
    debug(`deleting class "${id}"`);

    return ClassSchema.remove({ _id: id }).exec();
  },
};

module.exports = ClassService;
