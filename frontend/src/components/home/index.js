import { useNavigate,Link } from "react-router-dom"
import { useEffect,useState} from "react"
import Cookies from "js-cookie"
import Task from "../Task"
import "./index.css"
const Home = () => {
    const[task,setTask]=useState("")
    const[description,setDescription]=useState("")
    const[userTasks,setUserTasks] = useState([])
    const[isUpdate,setIsUpdate]=useState(false)
    const[updateUderId,setupdateUderId]=useState(null)
    const navigate=useNavigate()
    
    const getUserTasksData=async()=>{
        const jwt= Cookies.get("jwt_token")
        if(jwt===undefined){
            navigate("/login")
        }else{
            const url = "http://localhost:4000/getTasks"
            const options = {
                method:"GET",
                headers:{
                    "authorization":`Bearer ${jwt}`
                }
            }
            const response = await fetch(url,options)
            const data = await response.json()
            if(response.ok){
                setUserTasks(data)
            }
            }
        }
    
        useEffect(()=>{
            getUserTasksData()
        })

    const onChangeTask = (event)=>{
        setTask(event.target.value)
    }

    const onChangeDescription = (event)=>{
        setDescription(event.target.value)
    }

    const onSubmitTask = async () => {
        const userTask = {
            task,description
        }
        const jwt = Cookies.get("jwt_token")
        const url = "http://localhost:4000/addTask"
        const options={
            method:"POST",
            headers:{
                "Content-type":"application/json",
                "authorization":`Bearer ${jwt}`
            },
            body:JSON.stringify(userTask)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            setUserTasks(prev=>[...prev,data])
            getUserTasksData()
        }
        setDescription("")
        setTask("")
    }
    
    const onDelTask=async(id)=>{
        const jwt = Cookies.get("jwt_token")
        const url = "http://localhost:4000/deleteTask/"+id 
        const options = {
            method:"DELETE",
            headers:{
                "authorization":`Bearer ${jwt}`
            }
        }
        const response = await fetch(url,options)
        if(response.ok){
            getUserTasksData()
        }
    }

    const onEditTask =(id,task,description) => {
        setIsUpdate(true)
        setDescription(description)
        setTask(task)
        setupdateUderId(id)
    }

    const onUpdate = async() =>{
        setIsUpdate(false) 
        const updateData = {
            task,description
        }
        const jwt = Cookies.get("jwt_token")
        const url = "http://localhost:4000/updateTask/"+updateUderId
        const options={
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "authorization":`Bearer ${jwt}`
            },
            body:JSON.stringify(updateData)
        }
        const response = await fetch(url,options)
        if(response.ok){
            getUserTasksData()
        }
        setDescription("")
        setTask("")
    }

    const onCompleteTask = async(id,isComplete) =>{
        let userTaskComplete
        if(isComplete) userTaskComplete={isComplete:false}
        else userTaskComplete={isComplete:true}
        const url = "http://localhost:4000/updateComplete/"+id
        const jwt = Cookies.get("jwt_token")
        const options = {
            method:"PUT",
            headers:{
                "Content-type":"application/json",
                "authorization":`Bearer ${jwt}`
            },
            body:JSON.stringify(userTaskComplete)
        }
        const response = await fetch(url,options)
        if(response.ok){
            getUserTasksData()
        }
        console.log(isComplete)
    }

    const onLogout=()=>{
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    const textInput = () =>{
        return(
            <div className="task-input-container">
                <div className="input-container">
                    <label className="task-label">Task:</label>
                    <input className="task-input" type="text" placeholder="Enter task" onChange={onChangeTask} value={task}/>
                    <label className="task-label">Description:</label>
                    <input className="description-input" type="text" placeholder="Enter Description" onChange={onChangeDescription} value={description}/>
                    {!isUpdate?(
                        <button className="task-btn" type="submit" onClick={onSubmitTask}>Add Task</button>
                    ):(
                        <button className="task-btn" type="button" onClick={onUpdate}>Update Task</button>
                    )}
                </div>
            </div>
        )
    }

    const userTodosTask = () =>{
        return(
            <div className="tasks-container">
                <h1 className="title">Your Tasks</h1>
                {userTasks.length===0?(
                    <div className="no-tasks-container">
                        <h1 className="no-task">Tasks are not created yet</h1>
                    </div>    
                ):(
                <ul className="ul-container">
                {userTasks.map((each)=>(
                    <Task 
                        userTasksList={each} 
                        key={each._id} 
                        onDelTask={onDelTask} 
                        onEditTask={onEditTask}
                        onCompleteTask={onCompleteTask}
                    />   
                ))}
            </ul>
                )}
            </div>
        )
    }

    const navBar = () =>{
        return(
            <nav className="nav-container">
                <h1 className="title">DO TASK</h1>
                <ul className="nav-items-container">
                    <Link className="nav-link" to="/"><li className="nav-li">Home</li></Link>
                    <Link className="nav-link" to="/completedTasks"><li className="nav-li">completed</li></Link>
                    <Link className="nav-link" to="/pendingTasks"><li className="nav-li">Pending</li></Link>
                    <li className="nav-li">
                        <button type="button" onClick={onLogout} className="logout-btn">LOGOUT</button>
                    </li>
                </ul>
            </nav>
        )
    }

    return(
        <div className="home-container">
            {navBar()}
            {textInput()}
            {userTodosTask()}
        </div>
    )
}

export default Home