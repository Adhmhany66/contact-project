const express = require ("express")
const dotenv = require("dotenv").config()
const contactRouter = require('./routers/contactRouter') 
const errorHandlelr = require('./middleware/errorhandler');
const connectDb = require("./.config/connectdb");
const userRouter = require('./routers/userRouter')
const app = express();


connectDb()
app.use(express.json())
app.use("/api/contacts",contactRouter)
app.use("/api/users",userRouter)
app.use(errorHandlelr)



const port = process.env.PORT || 5000

app.listen(port, (err)=>{
    console.log(err)
    console.log(`server running on port ${port}`)
})

