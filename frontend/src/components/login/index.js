import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import Cookies from "js-cookie"
import "./index.css"
const Login = () => {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")
    const navigate = useNavigate()

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const onLoginForm = async(event) =>{
        event.preventDefault()
        const userDetails = {
            email,
            password
        }
        const url = "http://localhost:4000/login"
        const options = {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(userDetails)
        }
        const response = await fetch(url,options)
        const data = await response.json()
        if(response.ok){
            Cookies.set("jwt_token",data.jwt,{expires:30})
            navigate("/")
        }
        
    }

    const jwt_token = Cookies.get("jwt_token")
    if(jwt_token===undefined){
        return(
            <div className="login-container">
                <form className="cart" onSubmit={onLoginForm}>
                    <label htmlFor="user-email" className="label">Email:</label>
                    <input
                        className="input"
                        type="email"
                        placeholder="Enter email"
                        id="user-email"
                        onChange={onChangeEmail}
                    />
                    <label htmlFor="user-password" className="label">password:</label>
                    <input
                        className="input"
                        type="password"
                        placeholder="Enter Password"
                        id="user-password"
                        onChange={onChangePassword}

                    />
                    <p className="register-text">Don't have an account: <Link to="/register">Register</Link></p>
                    <button 
                        className="button"
                        type="submit" 
                    >
                        SIGN IN
                    </button>
                </form>
            </div>
        )
    }
}
export default Login