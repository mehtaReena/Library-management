
require ('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const categoryController = require('./controllers/categoryController');
const bookController = require('./controllers/bookController');

const cors = require('cors')
const bookRouter = require("./routes/book");
const authRouter = require("./routes/auth");
const categoryRouter = require("./routes/category");

mongoose.connect(process.env.MONGODB_URL, {
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

app.use('/auth',authRouter)
app.use('/categories',categoryRouter);




app.get('/',async(req,res)=>{
    // res.render('index',{message:'Welcome to Library!'})

     res.send('Welcome.to Library!')
});


let validateRequest=(req,res,next)=>{
    let authHeader = req.headers["authorization"];
      console.log(authHeader )
    if (!authHeader){
        res.status(403).send(" Token not provided");
        return;
    }
    let token = authHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Token not provided");
        return;
    }
    try{
         console.log( "token......." , token)

        let data= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        console.log("From Token..... " , data);
        next();
    }catch(err){
         console.log( err.message)
        res.status(403).send("Invalid Token  provided");

    }

}

app.use("/books",validateRequest,bookRouter)

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
















const PORT=3300;
app.listen(PORT,()=>{
    console.log(`Server is  listing  at http://localhost: ${PORT}`)
})