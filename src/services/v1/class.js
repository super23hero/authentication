const debug = require('debug')('app:services:v1:class');
const _ = require('lodash');

const NotFoundError = require('../../errors/notFound');
const ClassSchema = require('../../models/v1/class');
const { transformCriteriaToObject } = require('../utils');

const ClassService = {

  /**
   *
   * @return {Promise|Array|{index: number, input: string}|*}
   */
  list: (query) => {
    debug('listing classes');

    const { criteria, fields, limit, skip, sort } = query;

    return ClassSchema.find(transformCriteriaToObject(criteria), fields)
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
    debug(`retrieving class "${id}"`);

    const entity = await ClassSchema.findOne({ _id: id }).exec();
    if (!entity) throw new NotFoundError(`class "${id}" not found`);

    return entity.populate('day_care').execPopulate();
  },

  /**
   *
   * @param body
   * @return {Promise.<void>}
   */
  create: async (body) => {
    debug(`creating class "${body.name}"`);

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
    debug(`updating class "${id}"`);

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
