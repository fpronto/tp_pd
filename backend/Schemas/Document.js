const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Document = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    }
});

mongoose.model("documents", Document);