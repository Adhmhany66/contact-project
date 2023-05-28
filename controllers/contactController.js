const errorHandlelr = require('express-async-handler')
const contactModel =require('../models/contactmodel')

const getContact = errorHandlelr (async(req,res)=>{
    const contacts = await contactModel.find({user_id:req.user.id})
    res.status(200)
    .json(contacts)
})


const createContact = errorHandlelr (async (req,res)=>{
    console.log("the request body is :" ,req.body)
    const {name, email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(406)
        throw new Error ("All filds are mandatory")
    }

    const contact = await contactModel.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201)
    .json(contact)
})


const getContactUseId = errorHandlelr (async (req,res)=>{
    const contact = await contactModel.findById(req.params.id) 
    res.status(202)
    .json(contact)
    if(!contact){
        res.status(400)
        return new Error ('Contact Not Found')
    }
})


const updateContact = errorHandlelr (async (req,res)=>{
    const contact = await contactModel.findById(req.params.id)
   
    if (!contact){
        res.status(500)
        return new Error('conntact Not Found')

    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("the User don't have permmision to update other user contacts ")
    }
    const updatContact = await contactModel.findByIdAndUpdate(
        req.params.id,
        req.body,
         {new:true}
         );

         res.status(203)
         .json(updatContact)
})


const deleteContact = errorHandlelr( async (req,res)=>{
    const contact = await contactModel.findById(req.params.id)
    if(!contact){
       return next(new AppError('Not document find with this id', 404));
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("the User don't have permmision to update other user contacts ")
    }
    await contact.deleteOne();
    res.status(204)
    .json({
        
        data:contact,
        message:"conntact is delete"})
})

module.exports = { 
    getContact , 
    createContact ,
    getContactUseId ,
    updateContact ,
    deleteContact 
} 