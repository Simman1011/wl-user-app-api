const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const { notFound, errorHandler } = require('./middlewares/errorHandler')
const PORT = process.env.PORT || 4000
const bodyParser = require("body-parser")
const dbConnect = require("./config/dbConnect")
const routers = require("./routes");

dbConnect()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

routers(app)

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, ()=>{
    console.log(`Server is running at PORT ${PORT}`);
})