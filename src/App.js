import React, { useEffect, useState } from "react";
import './App.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Login from "./Components/Login/Login";
import SignUp from './Components/Register/Register';
import UserDetails from "./Components/UserDetails/UserDetails";
import Navbar from './Components/Navbar/Navbar';
import AdminLoginNavbar from './Components/Navbar/AdminLoginNavbar';
import CreateQuiz from './Components/CreateQuiz/CreateQuiz';
import AdminHome from './Components/Admin/AdminHome';
import UserHome from './Components/User/UserHome';
import Configure from './Components/Configure/Configure';
import Analyze from './Components/Analyze/Analyze';
import UserReports from './Components/Reports/UserReports';
import QuizController from './Components/QuizController/QuizController';
import UserLoginNavbar from './Components/Navbar/UserLoginNavbar';
import ReviewNavbar from './Components/Navbar/ReviewNavbar';
import NormalNavbar from './Components/Navbar/NormalNavbar';
import Result from "./Components/quizHandler/Result";
import ExamReview from "./Components/ExamReview/ExamReview";




function App() {

  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    fetch("https://quiz-application-backend.onrender.com/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType === "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  var userId = userData._id;
  if(userId === null){
    console.log("No Auth")
  }else{
    console.log(`"userId is" ${userId}`);
  }

  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <div className="App">
       
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={isLoggedIn==="true" ? <UserDetails/> : <Login />} />
              <Route path="/navbar" element={<Navbar />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/userDetails" element={<UserDetails />}/>
              <Route path="/createQuiz/:id" element={<CreateQuiz />}/>
              <Route path="/adminHome" element={<AdminHome />}/>
              <Route path="/userHome" element={<UserHome/>}/>
              <Route path="/adminloginNavbar" element={<AdminLoginNavbar/>}/>
              <Route path="/userloginNavbar" element={<UserLoginNavbar/>}/>
              <Route path="/reviewNavbar" element={<ReviewNavbar/>}/>
              <Route path="/normalNavbar" element={<NormalNavbar/>}/>
              <Route path="/analyze/:id" element={<Analyze UID={userId}/>} />
              <Route path="/configure/:id" element={<Configure />} />
              <Route path="/userreports" element={<UserReports UID={userId}/>} />
              <Route path="/quiz/:id" element={<QuizController UID={userId}/>} />
              <Route path="/result/:id" element={<Result />}/>
              <Route path="/examreview/:id" element={<ExamReview />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App;