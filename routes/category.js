const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectID;
const categoryController = require('../controllers/categoryController');
router
.route("/")
.get(async (req, res)=>{
   // console.log("  categories")
    let categoryList = await categoryController.printAllCategories()
 //   console.log(categoryList)

     res.json(categoryList);

})

router.delete('/:CategoryID' ,async (req,res)=>{
    console.log("   req.params   "+ req.params)
    let id =req.params.CategoryID
    let category = await categoryController.removeCategoryByID(id)
    console.log("category ... removed ". category)
     let categoryList = await categoryController.printAllCategories()
     res.json(categoryList);

    // res.redirect('/');
    //  next();

})
module.exports= router;
