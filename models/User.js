const mongoose = require('mongoose');
const User = new mongoose.Schema({
    name: {type : 'string'},
    email: {type : 'string'},
    password: {type : 'string'},
});

const model = mongoose.model('User', User);
module.exports = model;