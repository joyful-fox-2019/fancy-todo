if(process.env.NODE_ENV === "development"){
    require("dotenv").config()
}


const express = require ("express")
const morgan = require ("morgan")
const cors = require ("cors")
const mongoose = require ("mongoose")
const routes = require ("./routes")
const errorHandlers = require("./middlewares/errorhandler")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
mongoose.set('useFindAndModify', false)


app.use("/", routes)
mongoose.connect(process.env.URL_MONGOOSE, {useNewUrlParser : true, useUnifiedTopology : true})
.then(function(){
    console.log("connected to database")
})
.catch(err =>{
    console.log("failed connect to database")
})


app.use(errorHandlers)

app.listen(PORT, function(){
    console.log("listening to PORT", PORT)
})

