const readlineSync = require('readline-sync');
const mongoose = require('mongoose');

const categoryController = require('./controllers/categoryController');
const bookController = require('./controllers/bookController');
const memberController = require('./controllers/memberController');
const issueController = require('./controllers/issuedController');



function displayOption() {
    console.log("-------------------------------------------------------");
    console.log("WelCome");
    console.log("---------------------- Category   -------------------------");
    console.log("1 : List of category     ");
    console.log("2 : Add category     ");
    console.log("3 : Delete category    ");
    console.log("---------------  BOOK --------------------");
    console.log("4 : List of books    ");
    console.log("5 : Add book       ");
    console.log("6 : Delete book      ");
    console.log("7 : Search  book    ");
    console.log("8 : Search  book  by category   ");
    console.log("-----------------      Member ------------------");
    console.log("9 : Show members   ");
    console.log("10 : Add member    ");
    console.log("11 : Remove member ");

    console.log("-----------------      Issue ------------------");
    console.log("12 : Show active issues   ");
    console.log("13 : Issue book    ");
    console.log("14 : Return  book ");
    console.log("15 : Get issue history of a book ");

    console.log("----------------- Exit ------------------");

    console.log("0 : Exit     ");

}
mongoose.connect('mongodb://127.0.0.1:27017/LibraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => {
    showOption();
});


async function showOption() {
    let db = mongoose.connection;
    while (true) {
        displayOption();
        let userChoice = readlineSync.question("Operation to perform    ")
        console.log(userChoice)
        let response = ''
        switch (userChoice) {
            case "1":
                await categoryController.printAllCategories();
                break;
            case "2":
                response = readlineSync.question('Enter your category name: you want to add     ');
                await categoryController.addCategories(response)
                break;
            case "3":
                response = readlineSync.question('Enter your category name , you want to remove: ');
                await categoryController.removeCategories(response)
                break;
            case "4":
                await bookController.printAllBooks();
                break;
            case "5":
                let title = readlineSync.question('Enter your book title name: you want to add     ');
                let author = readlineSync.question('Enter your book author name: you want to add    ');
                let bookCategory = readlineSync.question('Enter your bookCategory : you want to add   ');
                let price = readlineSync.question('Enter your book price(USD) : you want to add     ');
                await bookController.addBook(title, price, bookCategory, author);
                break;

            case "6":
                response = readlineSync.question('Enter your book title name: you want to remove   ');
                await bookController.removeBook(response);
                break;


            case "7":
                response = readlineSync.question('Enter your book title name: you want to search    ');
                await bookController.getBook(response);
                break;

            case "8":
                response = readlineSync.question('Enter your category: you want to search  book   ');
                await bookController.getBookByCategory(response);
                break;

            case "9":
                await memberController.printAllMember();
                break;

            case "10":
                let d = new Date();
                let time = d.getTime();
                let name = readlineSync.question('Enter member name : ');
                console.log(time);
                let id = (time + name[0] + name[1]).trim();
                await memberController.addMember(id, name);
                break;

            case "11":
                response = readlineSync.question('Enter member name : you want to remove ');
                await memberController.removeMember(response);

                break;

            case "12":
                await issueController.showAllActiveIssues();
                break;

                break;
            case "13":
                let member = readlineSync.question('Enter member name ');
                let book = readlineSync.question('Enter book name : you want to issue ');
                await issueController.issueBook(book, member);
                break;

                break;
            case "14":
                res = readlineSync.question('Enter member name ');
                // let book = readlineSync.question('Enter book name : you want to issue '   );
                await issueController.returnBook(res);
                break;

            case "15":
                    response = readlineSync.question('Enter Enter book name   ');
                    await issueController.GetIssueHistory(response);
                    break;




            case "0":
                db.close();
                return;
        }
    }

}


