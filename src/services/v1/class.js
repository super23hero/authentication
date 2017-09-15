const debug = require('debug')('app:services:v1:class');

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
};

module.exports = ClassService;
