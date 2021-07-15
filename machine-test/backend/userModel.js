const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: { type : String },
    lastName: { type : String },
    email: { type : String },
    mobile: { type : Number },
    profileImage: { type : String },
});

const Users = mongoose.model('users', schema);

module.exports = Users;