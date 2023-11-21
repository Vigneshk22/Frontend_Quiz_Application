import React from "react";
import { Link } from "react-router-dom";


const UserLoginNavbar = () => {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <nav className="navbar" style={{position:"sticky"}}>
      <Link className="heading" to={"#"}>
        Quizol
      </Link>

      <div className="logoutbtn">
      <button onClick={logOut} className="admin-logout-button">
        Logout
      </button>
      </div>
    </nav>
  );
};

export default UserLoginNavbar;
