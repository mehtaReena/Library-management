const User = require('../models/user');
const bcrypt = require("bcrypt");

const defaultPic = '/images/user.jpg'

const addNewuser = async ({name, email,password, photourl}) => {
    console.log(name, email,password)
    try {
        if (!photourl) {
            photourl = defaultPic;
        }
        let emailRegex =/.*@.*\.*/;

         if (!emailRegex.test(email)) {
            return { status: false, result: 'Invalid email' }
        }

        if (!password) {
            return { status: false, result: 'Password is requried!' }
        }
        let hash = await bcrypt.hash(password, 10);


        let user = new User({ name, email, password:hash, photourl });
        let saveUser = await user.save();
        console.log('User saved successfuly' , saveUser)
        return { status: false, result: 'User saved successfuly' }
    }
    catch (err) {
        console.log('Error Occured', err)
        return { status: false, result: 'Error' + err.message }

    }
}


const login = async (name) => {
    try {


    }
    catch (e) {
        console.log('Error Occured', e)
    }

}




module.exports = {
    addNewuser,
    login
}