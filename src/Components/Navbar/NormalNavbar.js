import React from "react";
import { Link } from "react-router-dom";


const NormalNavbar = () => {

  return (
    <nav className="navbar">
      <Link className="heading" to={"#"}>
      QUIZOL
      </Link>

    </nav>
  );
};

export default NormalNavbar;
