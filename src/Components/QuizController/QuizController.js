import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';

import CountDownTimer from "../CountDownTimer";
import Quiz from "../quizHandler/Quiz";



const QuizController = (UID) => {

    const userId = UID.UID
    const [questions, setQuestions] = useState([]);
    const [score, setScore] = useState(0);
    const [exam_id, setExam_id] = useState("");
    const [timerData, setTimerData] = useState(0);

    const navigate = useNavigate()

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExams();
    }, [])

    const getExams = async()=>{
        const {data} = await axios.get("https://quiz-application-backend.onrender.com/examquestions/" + id.id);
        setQuestions(data);
        console.log(data);
        userCheck();
    }

    const securityData = async () => {
        axios.all([
            await axios.get("https://quiz-application-backend.onrender.com/getAllUsers/" + UID.UID),
            await axios.get("https://quiz-application-backend.onrender.com/exam/exam/" + id.id)
        ]).then(axios.spread((data1, data2) => {
            // console.log(data1.data);
            const dummyData = {
                userId: UID.UID,
                examId: id.id,
                userInfo: {
                    // username: data1.data[0].fname + " " + data1.data[0].lname,
                    examname: data2.data[0].examname,
                    score: 0,
                }    
            };
            
            axios.post("https://quiz-application-backend.onrender.com/userexams/", dummyData)
            .then((response) => {
                    console.log(response.status);
                    console.log(response.data);
                    setExam_id(response.data._id)
                });                
                setTimerData(data2.data[0].time)

                setTimeout(() => {
                    navigate("/result/" + id.id)
                }, ((data2.data[0].time) * 60) + "000");
            }))
    }

    const userCheck = async () => {
        try{
            const {data} = await axios.get("https://quiz-application-backend.onrender.com/userexams/"+ UID.UID);

            const myData = await Promise.all(data.map((d) => d.examId))
            for (let i = 0; i <= myData.length; i++) {
                if (myData[i] === id.id) {
                    alert("you have already took this exam")
                    navigate("/userHome")
                    return
                }
            }
            securityData();

        }catch (err) {
            console.log(err);
            alert("You already took this exam")
        }
    }
    
    const hoursMinSecs = {hours:0, minutes: timerData, seconds: 0}


    return (
        <div>
            <CountDownTimer hoursMinSecs={hoursMinSecs}/>
            <Quiz
                questions={questions}
                score={score}
                setScore={setScore}
                setQuestions={setQuestions}
                userId={userId}
                exam_id={exam_id}
            />
        </div>
    );
}

export default QuizController;