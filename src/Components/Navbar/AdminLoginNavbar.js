import React from "react";
import { Link } from "react-router-dom";


const AdminLoginNavbar = () => {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <nav className="navbar" style={{position:"sticky"}}>
      <Link className="heading" to={"/AdminHome"}>
        Quizol
      </Link>
      <div className="navbarItems">
      <Link className="report" to={"/AdminHome"}>
        Dashboard
      </Link>
        </div>
      <div className="logoutbtn">
      <button onClick={logOut} className="admin-logout-button">
        Logout
      </button>
      </div>
    </nav>
  );
};

export default AdminLoginNavbar;
