const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    photourl: {
        type: String,

    },

});

const UserModel = new mongoose.model('User', UserSchema);
module.exports = UserModel;