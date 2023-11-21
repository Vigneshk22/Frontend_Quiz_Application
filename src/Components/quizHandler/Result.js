import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NormalNavbar from "../Navbar/NormalNavbar";
import axios from 'axios'
import { useParams } from 'react-router-dom'
import "./Result.css";

const Result = () => {

  const [score, setScore] = useState(0);
  const [passGrade, setPassGrade] = useState(0);

  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamNames();
  }, [setScore])

  const getExamNames = async () => {
    const { data } = await axios.get(`https://quiz-application-backend.onrender.com/userexams/exam/${id.id}`);
    setScore(data);
    getPassGrade();
  }

  const getPassGrade = async () => {
    await axios.get(`https://quiz-application-backend.onrender.com/exam/exam/${id.id}`).then((response) => {
      setPassGrade(response.data);
    });
  }

  return (
    <>
      <NormalNavbar />
      <div className="resultsContainer">
        <span className="finalScore">Final Score : {score[0]?.grade}</span> <br />
        {passGrade[0]?.passGrade < score[0]?.grade ? (<><span className="passText">Congratulations, you have passed</span><br /><img src="https://i.ibb.co/7vPw6r4/Png-Item-30479.png" style={{ height: "200px", width: "300px", marginLeft: "auto", marginRight: "auto" }} /></>) : (<><span className="failText">Sorry, you have failed</span></>)}
        <Link to="/UserHome">
          <button
            variant="contained"
            color="secondary"
            size="large"
            style={{ alignSelf: "center", marginTop: 20, cursor: "pointer" }}
            className="dashboard"
          >
            Go to dashboard
          </button>
        </Link>
      </div>
    </>
  );
};

export default Result;