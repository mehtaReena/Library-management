
const Category = require('../models/category')
const ObjectId = require('mongodb').ObjectID;



const printAllCategories = async () => {

    try {
        let categories = await Category.find();
        console.log("-----");
        if (categories.length === 0) {
            console.log('No category found')
        }
        else {
            categories.forEach((category) => {
                console.log(category.name);
            })
        }
        return categories;
    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const addCategories = async (name) => {
    try {
        const category = new Category({ name });
        await category.save();
        console.log('Category saved successfuly')
    }
    catch (e) {
        console.log('Error Occured', e)
    }
}


const removeCategories = async (name) => {
    try {
        const category = await Category.findOne({ name: name });
        if (category == null) {
            console.log("Category not found")
        }
        else {
            await category.remove();
            console.log("Removed Successfuly")

        }

    }
    catch (e) {
        console.log('Error Occured', e)
    }

}

const removeCategoryByID = async (id) => {
    console.log(" ObjectId  removed "+  id)
    try {

         id = ObjectId(id);

         console.log(" ObjectId  removed "+  id)
        const category = await Category.findOne({_id: id });
        if (category == null) {
            // console.log("Category not found");
            return "Category not found"
        }
        else {
            await category.remove();
            // console.log("Removed Successfuly");
            return "Removed Successfuly"
        }
    }
    catch (e) {
        console.log('Error Occured', e.message)
        return  e.message
    }

}




module.exports = {
    printAllCategories,
    addCategories,
    removeCategories,
    removeCategoryByID
}