import React, { useState } from "react";
import { Link } from 'react-router-dom';
import "./Login.css";
import Navbar from "../Navbar/Navbar"

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const handleSubmit = (e) =>{
    e.preventDefault();

    console.log(email, password);
    fetch("https://quiz-application-backend.onrender.com/login-user",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok"){
        alert("login successful");
        window.localStorage.setItem("token", data.data);
        window.localStorage.setItem("loggedIn", true);
        
        window.location.href = "./userDetails";
      }
    });
   }

    return (
      <div>
           <Navbar/>
           
             <form onSubmit={handleSubmit} className='login-form'>
        <h3>Login</h3>

        <div className="email">
          <i className="fa-solid fa-user icon fa-lg" style={{color: '#269de1'}}></i>
          <input
            type="email"
            className="input"
            placeholder="Enter email"
            onChange={(e)=> setEmail( e.target.value)}
          />
        </div>

        <div className="password">
        <i className="fa-solid fa-lock icon fa-lg" style={{color: '#269de1'}}></i>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>

        <div className="checkbox">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input check"
              id="customCheck1"
            />
            <label className="remember" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <div className="btn">
          <button style={{outline: 'none'}} type="submit" className="submit">
            Submit
          </button>
        </div>
        <p className="signup-link">
           Don't have account? <Link to={'/sign-up'}>Sign up</Link>
        </p>
      </form>
      </div>
    
     
    )
  
}