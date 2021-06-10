
const Book = require('../models/book');
const Category = require('../models/category')
const ObjectId = require('mongodb').ObjectID;


const printAllBooks = async () => {
    try {
        let books = await Book.find();
        console.log("-----");
        if (books.length === 0) {
            console.log('No category found')
        }
        else {

            books.forEach((book) => {
                console.log("Book name :" + book.title + " Author :" + book.author + " Price(USD) :" + book.price);

            })
        }
        return books;

    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const addBook = async (title, price, bookCategory, author) => {
    try {
        console.log(title, author, price, bookCategory)
        const category = await Category.findOne({ name: bookCategory });
        const book = new Book({ title: title, price: price, category: category.id, author: author });
        await book.save();
        console.log('Category saved successfuly')
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}


const removeBook = async (name) => {
    try {
        const book = await Book.findOne({ name: name });
        if (book == null) {
            console.log("Book not found");
        }
        else {
            await book.remove();
            console.log("Removed Successfuly");
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const removeBookByID = async (id) => {

    try {
        console.log(id)
         id = ObjectId(id);
        const book = await Book.findOne({ _id: id });
        if (book == null) {
            console.log("Book not found");
            return "Book not found"
        }
        else {
            await book.remove();
            console.log("Removed Successfuly");
            return "Removed Successfuly"
        }
    }
    catch (e) {
        console.log('Error Occured', e.message)
        return  e.message
    }

}



const getBook = async (title) => {

    try {
        let books = await Book.find({ "title": { $regex: title } })
        if (books.length === 0) {
            console.log("Book not found!");
        }
        else {
            books.forEach((book) => {
                console.log("Book name :" + book.title + " Author :" + book.author + " Price(USD) :" + book.price);
            })
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const getBookByCategory = async (bookCategory) => {

    try {
        const category = await Category.findOne({ name: bookCategory });
        if (category == null) {
            console.log("Category not found!");
        }
        else {
            const book = await Book.findOne({ category: category });
            console.log("Book name :" + book.title + " Author :" + book.author + " Price(USD) :" + book.price);
        }
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}






module.exports = {
    printAllBooks,
    addBook,
    removeBook,
    getBook,
    getBookByCategory,
    removeBookByID,


}