const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const bookController = require('../controllers/bookController');
router
.route("/")
.get(async (req, res)=>{
    let bookList = await bookController.printAllBooks()
    //console.log(bookList)
    //  res.render('index',{message:'Welcome to Library!' ,list:bookList})
   // res.send('List of books')
     res.json(bookList);

})
.post((req,res)=>{
    res.send('Adding new  book')

})

let bookHandler1=(req, res , next)=>{

    let id = req.params.BookID;
   // console.log(id)
    if (Number(id)!==NaN && Number(id)>0){
        next();
    }
    else{
        res.send("Invalid Book Id!..")
    }
}

let bookHandler2=(req, res)=>{
    res.send("Book requested :" + req.params.BookID);

}

router.get('/:BookID',[bookHandler1 ,bookHandler2]);

router.delete('/:BookID' ,async (req,res ,next)=>{
    console.log(req.params)
    let id =req.params.BookID
    let bookList = await bookController.removeBookByID(id)
     let List = await bookController.printAllBooks()
     res.json(List);

     res.redirect('/');
     next();

})
module.exports= router;
