const debug = require('debug')('app:services:v1:dayCare');
const _ = require('lodash');

const NotFoundError = require('../../errors/notFound');
const DayCare = require('../../models/v1/dayCare');

const DayCareService = {

  /**
   *
   * @return {Promise|Array|{index: number, input: string}|*}
   */
  list: (query) => {
    debug('listing day cares');

    const { criteria, fields, limit, skip, sort } = query;

    return DayCare.find(criteria, fields)
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
    return DayCare.findOne(criteria).exec();
  },

  /**
   *
   * @param id
   * @return {Promise}
   */
  findById: async (id) => {
    debug(`retrieving day care "${id}"`);

    const dayCare = await DayCare.findOne({ _id: id }).exec();
    if (!dayCare) throw new NotFoundError(`day care "${id}" not found`);

    return dayCare.populate('environments').execPopulate();
  },

  /**
   *
   * @param body
   * @return {Promise.<void>}
   */
  create: async (body) => {
    debug(`creating day care "${body.name}"`);

    const dayCare = new DayCare(body);
    await dayCare.save();
    return dayCare;
  },

  /**
   *
   * @param id
   * @param body
   * @return {Promise.<*|Promise>}
   */
  update: async (id, body) => {
    debug(`updating day care "${id}"`);

    const dayCare = await DayCareService.findById(id);
    await _.merge(dayCare, body).save();
    return dayCare;
  },

  /**
   *
   * @param id
   * @return {Promise.<Promise|Array|{index: number, input: string}|*>}
   */
  delete: async (id) => {
    debug(`deleting day care "${id}"`);

    return DayCare.remove({ _id: id }).exec();
  },

};

module.exports = DayCareService;
