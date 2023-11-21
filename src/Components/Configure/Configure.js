import React from 'react';
import "./Configure.css";
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import AdminLoginNavbar from '../Navbar/AdminLoginNavbar';
import axios from 'axios';


const Configure = () => {
    
  const [myStartDatas, setMyStartDatas] = useState([]);
  const [examName, setExamName] = useState("");
  const [examGrade, setExamGrade] = useState(0);
  const [examTime, setExamTime] = useState(0);

  const navigate = useNavigate()

  const params = useParams();
  const id = params;

  useEffect(() => {
    getConfigureData();
  }, [])

  const getConfigureData = async () => {
    await axios.get(`https://quiz-application-backend.onrender.com/exam/exam/` + id.id).then((response) => {
      console.log(response.status);
      setMyStartDatas(response.data);
    })
  }

  const handleConfigure = (e) => {
    e.preventDefault();
    const exam = {
      examname: examName,
      time: examTime,
      passGrade: examGrade,
    };
    axios.patch(`https://quiz-application-backend.onrender.com/exam/${id.id}`, exam).then((response) => {
      console.log(response.status);
      console.log(response.data);
      navigate("/AdminHome");
    });
  }


  return (
    <div>
        <AdminLoginNavbar/>

        <div className='ConfigureContainer'>
        <form onSubmit={handleConfigure}>
            <div className='Section'>
              <label className='configureLabel' htmlFor="quizName">Quiz Name</label>
              <input className='configureInput' type="text" name="quizName"  onChange={e => setExamName(e.target.value)} />
            </div>
            <div className='Section'>
              <label className='configureLabel' htmlFor="time">Time Limit</label>
              <input className='configureInput' type="number" name="time"  onChange={e => setExamTime(e.target.value)} />
            </div>
            <div className='Section'>
              <label className='configureLabel' htmlFor="grade">Pass Grade</label>
              <input className='configureInput' type="text" name="grade"  onChange={e => setExamGrade(e.target.value)} />
            </div>
            <div className='Section'>
              <button className='saveBtn' type='submit' align="right">Save</button>
            </div>
          </form>
        </div>
      
    </div>
  )
}

export default Configure
