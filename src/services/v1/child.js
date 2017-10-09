const debug = require('debug')('app:services:v1:class');
const _ = require('lodash');

const NotFoundError = require('../../errors/notFound');
const ChildSchema = require('../../models/v1/child');

const ChildService = {

  /**
   *
   * @return {Promise|Array|{index: number, input: string}|*}
   */
  list: (query) => {
    debug('listing children');

    const { criteria, fields, limit, skip, sort } = query;

    return ChildSchema.find(criteria, fields)
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
    return ChildSchema.findOne(criteria).exec();
  },

  /**
   *
   * @param id
   * @return {Promise}
   */
  findById: async (id) => {
    debug(`retrieving child "${id}"`);

    const entity = await ChildSchema.findOne({ _id: id }).exec();
    if (!entity) throw new NotFoundError(`child "${id}" not found`);

    return entity.populate('class').execPopulate();
  },

  /**
   *
   * @param body
   * @return {Promise.<void>}
   */
  create: async (body) => {
    debug(`creating child "${body.name}"`);

    const entity = new ChildSchema(body);
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
    debug(`updating child "${id}"`);

    const entity = await ChildSchema.findById(id);
    await _.merge(entity, body).save();
    return entity;
  },

  /**
   *
   * @param id
   * @return {Promise.<Promise|Array|{index: number, input: string}|*>}
   */
  delete: async (id) => {
    debug(`deleting child "${id}"`);

    return ChildSchema.remove({ _id: id }).exec();
  },
};

module.exports = ChildService;
