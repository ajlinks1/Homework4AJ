const mongoose = require('mongoose');

module.exports = mongoose.model('search_fields', new mongoose.Schema({
  Name: { type: String, required: true, unique: true },
}));
