import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./ExamReview.css";

const ExamReview = () => {
  const [examQuestions, setExamQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params;

  useEffect(() => {
    getExamInfos();
    console.log("check");
  }, []);

  const getExamInfos = async () => {
    const { data } = await axios.get(
      `https://quiz-application-backend.onrender.com/userexams/exam/${id.id}`
    );
    console.log(data);
    console.log(data[0].examReview.qAnswers);
    setExamQuestions(data);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <>
        <div
          style={{
            verticalAlign: "middle",
            display: "flex",
            border: "16px solid #f3f3f3",
            borderRadius: "50%",
            borderTop: "16px solid #3498db",
            width: "120px",
            height: "120px",
            WebkitAnimation: "spin 2s linear infinite",
          }}
        ></div>
      </>
    );
  }

  return (
    <div>
      <div className="reviewContainer">
        <TableContainer component={Paper}>
          <div className="reviewHeading">Exam Review</div>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              {/* <TableRow style={{ backgroundColor: "whitesmoke" }}>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow> */}
            </TableHead>
            {examQuestions?.map((exam, index) => (
              <TableBody>
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  key={exam._id}
                >
                  <TableCell
                    component="th"
                    scope="exam"
                    style={{
                      color: "#222831",
                      fontSize: "16px",
                      fontWeight: "600",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                    }}
                  >
                    {exam.examReview.map((examR, indexi) => (
                      <div className="reviewQues">
                          <label className="queLabel">
                            <span
                              style={{ color: "#4285F4", padding: "0.5rem" }}
                            >
                              {"Question Title :  "}
                            </span>
                            {examR.qTitle}
                          </label>
                          <div>
                            {/* <input type="radio" name={`${indexi + 1}`} /> */}
                            <label>
                              <span
                                style={{ color: "#FF8800", padding: "0.5rem" }}
                              >
                                {"User Answer : "}
                              </span>{" "}
                              {examR.qAnswers}
                            </label>
                          </div>
                          <div>
                            {/* <input type="radio" name={`${indexi + 1}`} /> */}
                            <label>
                              <span
                                style={{ color: "#007E33", padding: "0.5rem" }}
                              >
                                {"Correct Answer : "}
                              </span>
                              {examR.qCorrect}
                            </label>
                          </div>
                      </div>
                    ))}
                  </TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableBody>
            ))}
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ExamReview;
