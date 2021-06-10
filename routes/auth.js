const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/signup', async (req, res) => {
      console.log("   router" , req.body)
    let response = await userController.addNewuser(req.body)
    if (response.status) {

    }
    else {
        res.status(400).send(response.result)
    }

})
module.exports=router;