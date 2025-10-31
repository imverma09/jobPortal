const express =   require("express")
const app =  express()
const PORT = 5000
const cors =  require("cors") 
const dotenv =  require("dotenv")
const mongoose = require("mongoose")
const otpRouter = require('./router/Otp');
const userRouter = require('./router/userRoutes');
dotenv.config()
app.use(cors())
app.use(express.json())

app.use("/api/user" ,  otpRouter)
app.use("/api/users" ,  userRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT , ()=>{
        console.log("server Start : " + PORT)
    })
})

.catch(( error)=>{
    console.log( "mongoose connection Error :  " +error)
})


