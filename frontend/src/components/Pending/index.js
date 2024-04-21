import { useState,useEffect } from "react"
import Cookies from "js-cookie"
import {Link,useNavigate} from "react-router-dom"
const Pending = () =>{
    const[userTasks,setUserTasks]=useState([])
    const navigate = useNavigate()
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

    const filteredTasks = userTasks.filter((each)=>!each.isComplete)

    const onLogout=()=>{
        Cookies.remove("jwt_token")
        navigate("/login")
    }

    return(
        <div className="home-container">
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
            {filteredTasks.length===0?(
                <div className="no-tasks-container">
                    <h1 className="no-task">No Pending Tasks Here</h1>
                </div>
            ):(
            <ul className="ul-container">
                {filteredTasks.map(each=>(
                    <li key={each._id} className="each-task-container">
                        <div>
                            <h1 className="task">{each.task}</h1>
                            <p className="discription">{each.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            )}
        </div>
    )
}

export default Pending