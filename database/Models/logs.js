const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new mongoose.Schema({
    searchKeyword: String,
    result: [],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})
schema.plugin(mongoosePaginate);

module.exports = mongoose.model('search_logs', schema);
