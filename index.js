const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 4000
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
const authRouter = require("./routes/v1/authRoute")

dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//Auth Routes
app.use("/api/v1/user", authRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})