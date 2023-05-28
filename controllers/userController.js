const asyncHandlelr = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require ('jsonwebtoken')
const User = require('../models/userModel')
const dotenv = require ('dotenv')

const registerUser = asyncHandlelr(async (req,res)=>{
    const {username, email, password}= req.body
    if(!username || !email , !password){
        res.status(404)
        throw new Erorr('All fields are mandatory!')
    }
    // find for the email alredy registe  
    const userAvailable = await User.findOne({email})
    //if the email is registered before that throw this error
    if(userAvailable){
        res.status(405)
        throw new Error('This user is arleady register')
    }
    //Hash password 
    const hashPassword= await bcrypt.hash(password,10)
    console.log("Hash password :" ,hashPassword)

    //create new user 
    const user = await User.create({
        username,
        email,
        password:hashPassword
    })
    console.log(` user created ${user}`)
    if (user){
        res.status(202)
        .json({
            _id:user.id,
            email: user.email
        })
    }else{
        res.status(401)
        throw new Error ("user data us not valid")
    }
 

    res.status(200)
    .json({message:'register The user'})

})

const loginUser = asyncHandlelr(async (req,res)=>{
    const {email , password} = req.body
    if(!email || !password){
        res.status(401)
        throw new Error('All fields are mandatory!')
    }
    const user = await User.findOne({ email })
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign(
            {
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
           },
           process.env.JWT_SECRET,
           {expiresIn :"15m" }
           )
        res.status(200)
        .json({accessToken})
  

    }else{
        res.status(404)
        throw new Error('Email or Password is not Valid')
    }


})
const currentUser = asyncHandlelr(async (req,res)=>{
    res.status(201)
    .json(req.user)
})


module.exports= {
    registerUser ,
    loginUser ,
    currentUser
    
}