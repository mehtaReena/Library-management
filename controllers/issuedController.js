const Issue = require('../models/issued')
const Member = require('../models/member')
const Book = require('../models/book')



const showAllActiveIssues = async () => {

    try {

        let issues = await Issue.find({issued:true});
        console.log("-----");
        if (issues.length === 0) {
            console.log('Not found')
        }
        else {
            issues.forEach((issue) => {
                console.log("bookID:  " + issue.bookID + " MemberID :   " + issue.MemberID + "issuedDate :   " + issue.issuedDate);
            })
        }


    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const issueBook = async (bookName, memberid) => {
    try {
        console.log(bookName, memberid)
        // const category = await Category.findOne({ name: bookCategory });
        // var myDate = new Date(new Date().getTime()+(5*24*60*60*1000));
        const book = await Book.findOne({ title: bookName });
        const member = await Member.findOne({ memberID: memberid });
        const issueStatus = await Issue.findOne({ bookID: book.id })
        console.log(issueStatus);

        if ((issueStatus == null) || (issueStatus.bookID == false)) {

            const issue = new Issue({ bookID: book.id, MemberID: member.id, issued: true });
            await issue.save();
            console.log('Book issued successfuly')
        }
        else {
            console.log('Book is issued to someone!')
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}


const returnBook = async (memberid) => {
    try {
        // const book = await Book.findOne({ title: bookName });
        const member = await Member.findOne({ memberID: memberid });
        const issue = await Issue.findOne({ MemberID: member.id })
        console.log(issue);

        if (Issue != null) {
            // await issue.updateOne({issue:false},{returnDate:Date.now()})
            await Issue.update({ _id: issue.id }, {
                issued: false,
                returnDate: Date.now()
            })
            console.log(" Book returned!")
        }
        else {
            console.log('Not found!!')
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const  GetIssueHistory = async (bookName) => {
    try {
        const book = await Book.findOne({ title: bookName });

        let issues = await Issue.find({bookID:book.id});
        console.log("-----");
        if (issues.length === 0) {
            console.log('Not found')
        }
        else {
            issues.forEach((issue) => {
                console.log("bookID:  " + issue.bookID + " MemberID :  " + issue.MemberID + "issuedDate :   " + issue.issuedDate);
            })
        }


    }
    catch (e) {
        console.log('Error Occured', e)
    }

}



module.exports = {
    issueBook,
    showAllActiveIssues,
    returnBook,
    GetIssueHistory,

}

