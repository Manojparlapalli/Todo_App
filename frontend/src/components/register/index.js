import {useState} from "react"
import { useNavigate } from "react-router-dom"
import "./index.css"
const Register = () => {
    const[username,setUsername]=useState("")
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const navigate = useNavigate()

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onSubmitSignupForm = async (event) => {
        event.preventDefault()
        const userDetails = {
            username,email,password
        }
        const url = "http://localhost:4000/register"
        const options = {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        if(response.ok){
            navigate("/login")
        }

    }

    return(
        <div className="login-container">
            <form className="cart" onSubmit={onSubmitSignupForm}>
                <label htmlFor="username" className="label">Email:</label>
                <input
                    className="input"
                    type="username"
                    placeholder="Enter Username"
                    id="username"
                    onChange = {onChangeUsername}
                />
                <label htmlFor="email" className="label">Email:</label>
                <input
                    className="input"
                    type="email"
                    placeholder="Enter email"
                    id="email"
                    onChange = {onChangeEmail}

                />
                <label htmlFor="password" className="label">password:</label>
                <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    onChange = {onChangePassword}

                />
                <button 
                    className="button"
                    type="submit" 
                >
                    SIGN UP
                </button>
            </form>
        </div>
    )
}
export default Register