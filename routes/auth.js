const jwt = require('jsonwebtoken');
const express = require('express');
const { addNewUser, getUsers, loginUser } = require('../controllers/usersController');
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'static/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const multipart = multer({ storage: storage })
const router = express.Router()

router.get('/', async (req, res) => {
    let users = await getUsers()
    if (users.status) {
        res.send(users.result)
    } else {
        res.status(400).send(users.result)
    }
})

router.post('/signup', multipart.single('profilePic'), async (req, res) => {
    req.body.photoUrl = req.file.path
    let newUser = await addNewUser(req.body)
    if (newUser.status) {
        res.send(newUser.result)
    } else {
        res.status(400).send(newUser.result)
    }
})


router.post('/login', async (req, res) => {
    //    console.log(req.body)
    let loginResult = await loginUser(req.body)
    console.log(loginResult)

    if (loginResult.status) {
        let payload = {
            email: loginResult.result.email,
            iat: Date.now()
        }
        console.log(payload)
        let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
        console.log("token generated ..", token)
        res.status(200).json({ "access_token": token });

    } else {
        res.status(400).json(loginResult.result)
    }
})

module.exports = router