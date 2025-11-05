const express =   require("express")
const app =  express()
const PORT = 5000
const cors =  require("cors") 
const dotenv =  require("dotenv")
const mongoose = require("mongoose")
const otpRouter = require('./router/Otp');
const userRouter = require('./router/userRoutes');
const jobRouter = require('./router/jobs');
const cookiesParser = require('cookie-parser');
dotenv.config()
app.use(cors({
    origin : ["http://localhost:5173"] , 
    credentials : true
}))
app.use(express.json())
app.use(cookiesParser())

app.use("/api/user" ,  otpRouter)
app.use("/api/users" ,  userRouter)
app.use("/api/data" ,  jobRouter)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT , ()=>{
        console.log("server Start : " + PORT)
    })
})

.catch(( error)=>{
    console.log( "mongoose connection Error :  " +error)
})


