const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
 name:{
     type:String,
     unique:true,
     required:true,
 },
 createdAt:{
     type:Date,
     default:Date.now,

 }
});

const CategoryModule=new mongoose.model('category',CategorySchema);
module.exports=CategoryModule;