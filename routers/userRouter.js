const express = require('express')
const  {registerUser ,loginUser ,currentUser,forgotPassword ,updatePassword} = require('../controllers/userController')
const validatToken = require('../middleware/validateTokenhandelar')


const router = express.Router()

router.post('/register',registerUser)

router.post('/login',loginUser)
router.get('/current', validatToken , currentUser)

router.post('/forgot-password', forgotPassword)

module.exports=  router;