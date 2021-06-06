const mongoose = require('mongoose');



const IssueSchema = new mongoose.Schema({
    bookID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Book'
    },
    MemberID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Member'
    },
    issuedDate: {
        type:Date,
        default:Date.now,

    },
    returnDate: {
        type: Date,

    },
    issued :{
        type :Boolean,

    }
});

const IssueModule = new mongoose.model('issue', IssueSchema);
module.exports = IssueModule;