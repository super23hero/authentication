exports.transformCriteriaToObject = (criteria) => {
  if (!criteria) return {};
  return criteria.split(',').reduce((acc, cur) => {
    const keyValueArray = cur.split(':');
    acc[keyValueArray[0]] = keyValueArray[1];
    return acc;
  }, {});
};
