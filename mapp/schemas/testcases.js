const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new mongoose.Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    platform: String,
    feature_id: {
        type: Schema.Types.ObjectId,
        ref: 'features'
    }
    
});

module.exports = mongoose.model('testcases', schema);