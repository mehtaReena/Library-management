const readlineSync = require('readline-sync');
const mongoose = require('mongoose');

const categoryController = require('./controllers/categoryController')
const bookController = require('./controllers/bookController')



function displayOption() {
    console.log("-------------------------------------------------------");
    console.log("WelCome");
    console.log("-------------------------------------------------------");
    console.log("1 : List of category     ");
    console.log("2 : Add category     ");
    console.log("3 : Delete category    ");
    console.log("4 : List of books    ");
    console.log("5 : Add book       ");
    console.log("6 : Delete book      ");
    console.log("7 : Search  book    ");
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
    while(true){
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
            response = readlineSync.question('Enter your category name , you want to delete: ');
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

        case "0":
            db.close();
            return;
    }
}

}


