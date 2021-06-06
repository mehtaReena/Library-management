const mongoose = require('mongoose');


const MemberSchema = new mongoose.Schema({
    memberID: {
        type: String,
        required: true,
        unique:true,
    },
    name:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }

});


const MemberModule = new mongoose.model('member', MemberSchema);
module.exports = MemberModule;