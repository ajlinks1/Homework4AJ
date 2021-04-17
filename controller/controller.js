const Model = require('../models/users.js');

exports.getStart = async (data) => {
  Model.find(data).select('-_id-__v');
  const queryResult = await Model.aggregate([])
    .search({
      autocomplete: {
        path: 'name',
        query: data,
      },
    })
    .limit(5);
  return queryResult;
};
exports.postUsers = async (query) => new Model(query).save();
