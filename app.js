const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const categoryController = require('./controllers/categoryController');
const bookController = require('./controllers/bookController');

const cors = require('cors')

mongoose.connect('mongodb://127.0.0.1:27017/LibraryDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}
).then(() => {
   console.log(" DataBase connected...")
});


const app =express();
app.use(express.static('static'))
app.use(morgan('dev'));
app.use(cors());
app.set('view engine','pug');
app.use (express.json());
app.use(express.urlencoded({extended:true}))
const authRouter = require("./routes/auth");
app.use('/auth',authRouter)


const bookRouter = require("./routes/book");


app.get('/',async(req,res)=>{
    // res.render('index',{message:'Welcome to Library!'})

     res.send('Welcome.to Library!')
});

app.use("/books",bookRouter)

app.get ('/form',async (req, res) => {
    let categories =await categoryController.printAllCategories();
    console.log(categories)
    res.render('form', {categories: categories});
});

app.all(/.*/,(req,res)=>{
    res.statusCode=404;
    res.send("Not found! ..")
})





/* app.get('/book',(req,res)=>{
    res.send('List of book')

})

app.get('/book/:bookID',(req,res)=>{
  console.log(req.params)
  res.send("Book requested :" + req.params.bookID);

})
 */




function printlogs(req){
    console.log(req)
    return "requested url :" +req
}












const PORT=3300;
app.listen(PORT,()=>{
    console.log(`Server is  listing  at http://localhost: ${PORT}`)
})