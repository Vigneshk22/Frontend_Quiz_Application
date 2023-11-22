import React from "react";
import { Link } from "react-router-dom";


const ReviewNavbar = () => {

  return (
    <nav className="navbar-review">
      <Link className="ExamReview" to={"#"}>
        Exam Review
      </Link>
    </nav>
  );
};

export default ReviewNavbar;
