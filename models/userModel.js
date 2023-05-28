const mongoose = require ('mongoose')


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please add The User name']   
    },
    email:{
        type: String,
        required:[true, 'please add the user Email Address'],
        unique:[true, 'Email Address Already taken']

    },
    
     password:{
            type: String,
            required:[true ,'please add the user password']

     },
    
},
{
    timestamps:true
}) 
const User = mongoose.model('User' , userSchema)
module.exports = User;