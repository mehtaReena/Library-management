
const Book = require('../models/book');
const Category = require('../models/category')


const printAllBooks =async()=>{
    try{
        let books= await Book.find();
        console.log("-----");
        if(books.length===0){
            console.log('No category found')
        }
        else{
            books.forEach((book)=>{
                console.log("Book name :"+ book.title + " Author :" + book.author  +" Price(USD) :"+ book.price);
            })
        }

    }
    catch(e){
        console.log('Error Occured' , e)
    }

}

const addBook =async(title,price,bookCategory,author)=>{
    try{
        console.log(title , author ,price , bookCategory)
        const category= await Category.findOne({ name: bookCategory });
         const book = new Book({title:title,price:price,category:category.id,author:author});
        await book.save();
        console.log('Category saved successfuly')
    }
    catch(e){
        console.log('Error Occured' , e)
    }

}


const removeBook =async(name)=>{
    try{
        const book = await Book.findOne({name:name});
        if (book==null){
             console.log("Book not found");        }
        else{
            await book.remove();
            console.log("Removed Successfuly");
        }
    }
    catch(e){
        console.log('Error Occured' , e)
    }

}
    const getBook= async(title)=>{

        try{
            let books = await Book.find({ "title" : {$regex:title}})
            if (books.length===0){
                 console.log("Book not found!");        }
            else{
                books.forEach((book)=>{
                    console.log("Book name :"+ book.title + " Author :" + book.author  +" Price(USD) :"+ book.price);
                })

            }
        }
        catch(e){
            console.log('Error Occured' , e)
        }




    }





module.exports={
    printAllBooks,
    addBook,
    removeBook,
    getBook,


}