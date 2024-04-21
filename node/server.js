const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Routes = require("./Routes/routes")
const app = express()
app.use(express.json())
app.use(cors())
mongoose.connect("mongodb+srv://jockers:jockers1234@cluster0.9k36amm.mongodb.net/Todo")
.then(()=>{
    console.log("Database is connected")
})
.catch((err)=>{
    console.log(err)
})

app.use("/",Routes)

app.listen(4000,()=>{
    console.log("Server is running at http://localhost:4000")
})