import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import Axios from 'axios';
import AdminLoginNavbar from "../Navbar/AdminLoginNavbar";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BarChart, Delete, Edit, Visibility } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

import "./AdminHome.css"

const AdminHome = () => {

  const [dummy, setDummy] = useState(0);

  const notify = () => toast.success("Link successfully  copied to the clipboard");
  
  const [examData, setExamData] = useState({
    examname: "",
    passGrade: "",
    time:"",
  })

  const [examNameStorage, setExamNameStorage] = useState([]);

  const getExamNames = async () => {
    const { data } = await Axios.get(`https://quiz-application-backend.onrender.com/exam`);
    setExamNameStorage(data);
  }

  const deleteExam = (id) => {
    Axios.delete(`https://quiz-application-backend.onrender.com/exam/${id}`).then((response) => {
      console.log(response.status);
      console.log(response.data);
    });
    setDummy(dummy + 1)
  }

  useEffect(() => {
    getExamNames();
  }, [examData, dummy]);


  
  function handle(e){
    const newdata = { ...examData}
    newdata[e.target.id] = e.target.value
    setExamData(newdata)
    console.log(newdata)
  }

  function submit(e){
    e.preventDefault();
    Axios.post("https://quiz-application-backend.onrender.com/", {
      examname: examData.examname,
    })
    .then(res => {
      console.log(res.examData)
    })
  }

  return (
    <div className="container-adminHome">
      <AdminLoginNavbar/>
      <Popup
            trigger={<button className="createQuiz">Create Exam </button>}
            modal
            nested
          >
            {close => (
              <div style={{display:"flex-box", justifyContent:"center", fontSize: "12px", backgroundColor: "#61D9F5", width: "400px", borderRadius:"15px"}}>
        
                <form onSubmit={(e)=> submit(e)}>
                  <div style={{ width: "100%", borderBottom: "1px solid gray", fontSize: "18px", padding: "5px", color: "white" }}>New Exam</div>
                  <div style={{display:"flex", justifyContent:"center", width: "100%", padding: "10px 5px" }}>
                    <input type="text" 
                    style={{ width: "90%", padding: "5px", borderRadius: "6px", border: "0", color:"#1A8ABA" }} 
                    placeholder='Enter title for your exam' 
                    onChange={(e)=>handle(e)} 
                    id="examname"
                    value={examData.examname} required/> 
                    <br />
                  </div>
                  <div style={{ width: "100%", padding: "10px 5px", margin: "auto", textAlign: "center" }}>
                    <Popup
                      trigger={<button className="formQButton" 
                      type="submit" 
                      style={{ width: "30%", marginRight: "10px", backgroundColor: "#0275d8", color: "white", borderRadius:"10px", border: "0"}}>
                         Confirm 
                         </button>}
                      position="top center"
                      nested
                    >
                    </Popup>
                    <button
                      className="formQButton" style={{ width: "30%", color: "#100F0F", borderRadius:"10px", border: "0"}} 
                      onClick={() => { close(); }}  
                      > Close
                    </button>
                  </div>
                </form>
              </div>
            )}
          </Popup>

          <div className="quizzes">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow style={{ backgroundColor: "whitesmoke" }}>
                  <TableCell className="quizzesHeading" style={{color:"#0051ff", fontSize:"20px", fontWeight:"500"}}>Quizzes</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                  {examNameStorage.map(name => {
                  return(<TableRow
                    key={name.examname}
                    className="quiz-list"
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell style={{color:"#0051ff", fontSize:"15px", fontWeight:"600"}} component="th" scope="row" onClick={() => { navigator.clipboard.writeText("http://localhost:3000/quiz/" + name._id) }}>
                      <span style={{ cursor: "pointer" }}> {name.examname} </span>
                    </TableCell>
                    <TableCell align="right"><Link to={`/analyze/${name._id}`}><button className="quiz-btns"><BarChart style={{ verticalAlign: "middle", padding: "5px" }} />Analyze</button></Link></TableCell>
                    <TableCell align="right"><Link to={`/createQuiz/${name._id}`}><button className="quiz-btns" ><Edit style={{ verticalAlign: "middle", padding: "5px" }} />Edit</button></Link></TableCell>
                    <TableCell align="right"><button className="quiz-btns" onClick={() => { deleteExam(name._id); }}><Delete style={{ verticalAlign: "middle", padding: "5px" }} />Delete</button></TableCell>
                  </TableRow>)
})}
            
                
              </TableBody>
            </Table>
          </TableContainer>

          </div>
         


    </div>
  );
};

export default AdminHome;
