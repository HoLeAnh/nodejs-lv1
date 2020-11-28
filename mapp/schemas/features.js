const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    project_id: {
        type: Schema.Types.ObjectId,
        ref: 'projects'
    }
});

module.exports = mongoose.model('features', schema);