const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    path: String
});

module.exports = mongoose.model('projects', schema);