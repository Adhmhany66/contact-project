const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    name:{
        type: String,
        required :[true, 'please add the connect name']
    },
    email:{
        type: String,
        required :[true, 'please add the connect Email']
    },
    phone:{
        type: Number,
        required :[true, 'please add the connect your number']
    }
},
{
  timestamps: true,
}
)

const contactModel = mongoose.model('contactModel',contactSchema)
module.exports = contactModel;