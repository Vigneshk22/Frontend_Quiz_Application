import React from 'react';
import AdminLoginNavbar from '../Navbar/AdminLoginNavbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react';
import "./Analyze.css";

const Analyze = (UId) => {

    const [examInfo, setExamInfo] = useState([]);
    const [start, setStart] = useState(true);

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExamInfos();
    }, [])


    const getExamInfos = async () => {
        const { data } = await axios.get(`https://quiz-application-backend.onrender.com/userexams/exam/${id.id}`);
        setExamInfo(data);
        setStart(false);
    }


    if (start) {
        return (
            <>
                <AdminLoginNavbar />
                <div style={{ verticalAlign: "middle", display: "flex", border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", WebkitAnimation: "spin 2s linear infinite" }}></div>
            </>)
    }

  return (
    <div>
       <AdminLoginNavbar />
            <div className='Analyze-Container'>
                <header className='analyzeHeader'>Exam analysis</header>
                <table>
                    <thead className='analyzeThead'>
                    <tr>
                        <th>UserId</th>
                        <th>Exam</th>
                        <th>Score</th>
                        <th>Review</th>
                    </tr>
                    </thead>
                    <tbody className='analyzeTbody'>
                    {examInfo.map((exam) => (
                        <tr
                            key={exam._id}>
                            <td align='left'>{exam.userId}</td>
                            <td align='center'>{exam.userInfo.examname}</td>
                            <td align='center'>{exam.grade}</td>
                            <td align='center'><Link to={`/examreview/${id.id}`}><button className='analyzeBtn'>Click me</button></Link></td>
                        </tr>
                    ))}
                    </tbody>
                    
                </table>
            </div>
    </div>
  )
}

export default Analyze
