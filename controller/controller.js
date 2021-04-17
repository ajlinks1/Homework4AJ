const Model = require('../models/users.js');

exports.getStart = async (data) => {
  const result = await Model.find({ Name: { $regex: data } });
  return result;
};
exports.postUsers = async (data) => new Model(data).save();
