const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    task:{
        type:String 
    },
    description:{
        type:String 
    },
    email:{
        type:String
    },
    isComplete:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("task",taskSchema)