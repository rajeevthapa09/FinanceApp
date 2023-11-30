const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String
    },
    password: String
});

module.exports = mongoose.model('User', userSchema);