const route = require("express").Router()
const bcrypt = require("bcrypt")
const jwtToken = require("jsonwebtoken")
const UserSchema = require("../Modal/userModal")
const TaskSchema = require("../Modal/taskModal")
const userModal = require("../Modal/userModal")
const taskModal = require("../Modal/taskModal")


const verifyJwtToken = (req, res, next) => {
    let jwt;
    const token = req.headers['authorization']
    if(token!==undefined){
        jwt = token.split(" ")[1]
    }
    if(jwt===undefined){
        res.status(400).json("Invalid Token")
    }else{
        jwtToken.verify(jwt,"manoj",(err,payload)=>{
            if(err){
                res.status(400).json(err)
            }else{
                req.email=payload.email
                next()
            }
        })
    }
};


// Register API's
route.post("/register",async(req,res)=>{
    const{username,email,password}=req.body
    const checkData = await UserSchema.find({email})
    const hassedPassword = await bcrypt.hash(password,10)
    if(checkData.length===0){
        const addData = new UserSchema({
            username,
            email,
            password:hassedPassword
        })
        await addData.save()
        res.status(200).json(addData)
    }else{
        res.status(400).json({err:"user is already registered"})
    }
})

//Login API's
route.post("/login",async(req,res)=>{
    const {email,password} = req.body 
    const checkData = await UserSchema.findOne({email})
    if(checkData){
        const isCheckPassword = await bcrypt.compare(password,checkData.password)
        if(isCheckPassword){
            const payload = {email:checkData.email}
            const jwt =jwtToken.sign(payload,"manoj")
            res.status(200).json({jwt})
        }else{
            res.status(400).json({err:"Incorrect Password"})
        }
    }else{
        res.status(400).json({err:"user is not registered"})
    }
})

//Get user profile Api

route.get("/profile",verifyJwtToken,async(req,res)=>{
    const {email} = req 
    const getData = await UserSchema.findOne({email})
    res.status(200).json(getData)
})

//create user task api
route.post("/addTask",verifyJwtToken,async (req,res)=>{
    const{task,description}=req.body 
    const{email} = req
    const addTask = TaskSchema({
        task,
        description,
        email
    })
    await addTask.save()
    res.status(200).json(addTask)
})

//Get user tasks api
route.get("/getTasks",verifyJwtToken,async(req,res)=>{
    const{email}=req
    const getTasks = await TaskSchema.find({email})
    res.status(200).json(getTasks)
})

//delete user task api
route.delete("/deleteTask/:id",verifyJwtToken,async(req,res)=>{
    const{id}=req.params 
    const deleteData = await TaskSchema.findByIdAndDelete(id)
    console.log(deleteData)
    if(deleteData===null){
        res.status(400).json("Task is not exist!")
    }
    res.status(200).json("Data Deleted Successfully!")
})

//update user task api
route.put("/updateTask/:id",verifyJwtToken,async(req,res)=>{
    const { id } = req.params;
    const{task,description}=req.body 
    const updateData = await taskModal.findByIdAndUpdate(
        id,
        {task,description}
    )
    res.status(200).json(updateData)
})

route.put("/updateComplete/:id",verifyJwtToken,async(req,res)=>{
    const{id} = req.params 
    const{isComplete} = req.body 
    const response = await taskModal.findByIdAndUpdate(
        id,
        {isComplete}
    )
    res.status(200).json(response)
})

module.exports=route