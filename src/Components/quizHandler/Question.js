import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import ErrorMessage from "./ErrorMessage";
import "./QuizLayout.css";

const Question = ({
  currQues,
  setCurrQues,
  questions,
  setQuestions,
  options,
  correct,
  setScore,
  score,
  userId,
  exam_id,
}) => {
  const [selected, setSelected] = useState();
  const [error, setError] = useState(false);


  const navigate = useNavigate();

  const params = useParams();
  const id = params;


  const handleSelect = (i) => {
    console.log(correct);
    if (selected == i && selected === correct) return "select";
    else if (selected === i && selected !== correct) return "wrong";
    else if (i === correct) return "select";
  };

  const handleCheck = (i) => {
    setSelected(i);
    if (i === correct) {
      setScore(score + 1);
    }
    setError(false);
  };

  const handleNext = () => {
    if (currQues >= questions.length - 1) {
      navigate(`/result/${id.id}`);
    } else if (selected) {
      setCurrQues(currQues + 1);
      setSelected();
    } else setError("Please select an option first");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

      const userExam = {
        userId: userId,
        examId: id.id,
        grade: score,
      };
       axios.patch(`https://quiz-application-backend.onrender.com/userexams/${exam_id}`, userExam).then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
    }
  
  const handleReview = (i) => {
    console.log(exam_id);

      const userOptions = {
        examReview: {
          qAnswers: i,
          qCorrect: correct,
          qTitle: questions[currQues].questionTitle,
        }
      };
    console.log(userOptions);
    axios
      .put(`https://quiz-application-backend.onrender.com/userexams/${exam_id}`, userOptions)
      .then((response) => {
        console.log(response.status)
        console.log(response.data);
      });
    }
  


  return (
    <div className="questionContainer">
      <h1 className="questionHeading">Question {currQues + 1} :</h1>
      <div className="singleQuestion">
      <h2>{questions[currQues]?.questionTitle}</h2>

        <div className="options">
          {error && <ErrorMessage>{error}</ErrorMessage>}
         
          {options &&
            options.map((option) => (
              <div className="option">
              <button
                className={`singleOption ${
                  selected && handleSelect(option.option)
                }`}
                id="optBtn"
                key={option._id}
                onClick={() => {
                  handleCheck(option.option);
                  handleReview(option.option);
                }}
                disabled={selected}
              >
                {option.option}
              </button>
              </div>
            ))}
          
          
        </div>
        <div className="control">
          <button
          className="subNext"
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues >= questions.length - 1 ? (
              <span onClick={handleSubmit}>Submit</span>
            ) : (
              <span>Next Question</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question
