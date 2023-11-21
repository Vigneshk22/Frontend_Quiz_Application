import React from 'react';
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "./Reports.css"

const UserReports = (UId) => {

    const [userDatas, setUserDatas] = useState([]);
    const [examDatas, setExamDatas] = useState([]);
  
    useEffect(() => {
      getUserDatas()
      getExamDatas()
    }, [])
  
  
  
    const getUserDatas = async () => {
      const { data } = await axios.get(`https://quiz-application-backend.onrender.com/userexams/` + UId.UId)
      setUserDatas(data)
      console.log(data)
    }
  
    const getExamDatas = async () => {
      await axios.get(`https://quiz-application-backend.onrender.com/exam`).then((response) => {
        setExamDatas(response.data)
        console.log(response.data)
      })
    }
  
  return (
    <div>
      <div className='reportsContainer'>
        <header className='reportsHeading'>Quizzes</header>
        <table>
        <thead className='reportThead'>
        <tr>
            <th>Exam Name</th>
            <th>Link</th>
            {/* <th>Status</th> */}
          </tr>
        </thead>
         <tbody className='reportTbody'>
         {examDatas.map((exam, index) => (
            <tr key={index}>
              <td align='center'>{exam.examname}</td>
              <td align='center'><Link to={`/quiz/${exam._id}`}><button className='reportBtn'>Go to exam</button></Link></td>
              {/* <td align='center'>{userDatas.findIndex(u=> u.examId === exam._id) > -1 ? (<span style={{border:"none",borderRadius:"10px",padding:"5px",backgroundColor:"#CC0000",color:"#EEEEEE",fontWeight:"500" }}>{"Solved"}</span>) : <span style={{border:"none",borderRadius:"10px",padding:"5px",backgroundColor:"#007E33",color:"#EEEEEE",fontWeight:"500" }}>{"Available"}</span>}</td> */}
            </tr>
          ))}
         </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserReports
