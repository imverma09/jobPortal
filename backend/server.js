const express = require("express")
const app = express()
const PORT = 5000
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const otpRouter = require('./router/Otp');
const userRouter = require('./router/userRoutes');
const jobRouter = require('./router/jobs');
const applicationRouter = require('./router/applications');
const saveJobRouter = require('./router/saveJob');
const jobViewRouter =  require("./router/jobView")
const cookiesParser = require('cookie-parser');
dotenv.config()
app.use(cors({
    origin: ["http://localhost:5173" , "https://job-portal-mauve-rho.vercel.app"],
    credentials: true
}))
app.use(express.json())
app.use(cookiesParser())
app.use("/api/user", otpRouter)
app.use("/api/users", userRouter)
app.use("/api/data", jobRouter)
app.use("/api/applications", applicationRouter)
app.use("/api", saveJobRouter)
app.use("/api/view", jobViewRouter)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("server Start : " + PORT)
        })
    })

    .catch((error) => {
        console.log("mongoose connection Error :  " + error)
    })


