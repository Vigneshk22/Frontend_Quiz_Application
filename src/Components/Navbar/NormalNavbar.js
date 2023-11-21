import React from "react";
import { Link } from "react-router-dom";


const NormalNavbar = () => {

  return (
    <nav className="navbar">
      <Link className="heading" to={"#"}>
        Quizol
      </Link>
    </nav>
  );
};

export default NormalNavbar;
