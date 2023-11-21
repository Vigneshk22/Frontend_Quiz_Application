import React, { useState } from "react";
import "./Register.css";
import Navbar from "../Navbar/Navbar"


export default function Register() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("user");
  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    console.log(fname, lname, email, password,userType);
    fetch("https://quiz-application-backend.onrender.com/register/",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        password,
        userType,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userRegister");
      if (data.status === "ok"){
        alert("Registration successful");

        window.location.href = "./sign-in";
      }else{
        alert("Account already exists");
        window.location.href = "./sign-up";
      }
    });
  }           


    return (
      
      <div>
        <Navbar/>
        
        <form onSubmit = {handleSubmit} className="register-form">
        <h3>Register</h3>

        <div className="input-box">
        <i className="fa-solid fa-user icon fa-lg" style={{color: '#269de1'}}></i>
          <input
            type="text"
            className="input"
            placeholder="First name"
            onChange={(e) => setFname(e.target.value)}
          />
        </div>

        <div className="input-box">
        <i className="fa-solid fa-user icon fa-lg" style={{color: '#269de1'}}></i>
          <input type="text" 
          className="input" 
          placeholder="Last name"
          onChange={(e)=>setLname(e.target.value)} 
          />
        </div>

        <div className="input-box">
        <i className="fa-solid fa-envelope icon fa-lg" style={{color: '#269de1'}}></i>
          <input type="email" 
          className="input" 
          placeholder="Enter email"
          onChange={(e) =>setEmail(e.target.value)} 
          />
        </div>

        <div className="input-box">
        <i className="fa-solid fa-lock icon fa-lg" style={{color: '#269de1'}}></i>
          <input
            type="password"
            className="input"
            placeholder="Enter password"
            onChange={(e) =>setPassword(e.target.value)}
          />
        </div>

        <div className="fbtn">
          <button style={{outline: 'none'}} type="submit" className="fsubmit">
            Sign Up
          </button>
        </div>
        <p className="log">
          Already have an account? <a href="/sign-in">sign in</a>
        </p>
      </form>
      </div>
      
    );
  
}
