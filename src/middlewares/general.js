const _ = require('lodash');

function normalizeHeaders(req) {
  const { headers } = req;
  if (_.isString(headers.populate)) headers.populate = headers.populate.split(',');
  if (_.isString(headers.fields)) headers.fields = headers.fields.split(',');
  if (headers.count) headers.count = headers.count !== 'false';
  if (headers.limit) headers.limit = Number(headers.limit);
  if (headers.skip) headers.skip = Number(headers.skip);
}

module.exports = () => {
  return (req, res, next) => {
    normalizeHeaders(req);
    next();
  };
};
