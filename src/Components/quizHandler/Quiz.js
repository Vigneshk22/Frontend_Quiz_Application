import React from 'react'
import { useEffect, useState } from "react";
import Question from "./Question";

const Quiz = ({ questions, score, setScore, setQuestions, userId, exam_id}) => {

    const [options, setOptions] = useState();
    const [currQues, setCurrQues] = useState(0);
    const [correct, setCorrect] = useState();

    useEffect(() => {
        startFunction();
    }, [currQues, questions]);

    const startFunction = () => {

        if (questions && questions[currQues] && questions[currQues].options) {
            const data = questions[currQues].options;
            setOptions(data);
    
            for (let k = 0; k < data.length; k++) {
                if (data[k].isCorrect) {
                    setCorrect(data[k].option);
                }
            }
        }
    };
    
  return (
       <div className="quiz">
            {questions ? (
                <>

                    <Question
                        currQues={currQues}
                        setCurrQues={setCurrQues}
                        questions={questions}
                        setQuestions={setQuestions}
                        options={options}
                        correct={correct}
                        score={score}
                        setScore={setScore}
                        userId={userId}
                        exam_id={exam_id}
                    />
                </>
            ) : (
                <div>Sorry we couldn't find any question</div>
            )}
        </div>
  )
}

export default Quiz
