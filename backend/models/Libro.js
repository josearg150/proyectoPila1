const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    cagtegory: {
        type: String,
        required: true
    },
    usr: {
        type: String,
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);