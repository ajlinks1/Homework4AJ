const mongoose = require('mongoose');

module.exports = mongoose.model('search_field', new mongoose.Schema({

  Name: { type: String, required: true, unique: true },

}, {
  toJSON: {
    getters: true,
    virtuals: false,
  },
}));
