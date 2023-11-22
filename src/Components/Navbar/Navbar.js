import React from 'react';
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";



const Navbar = () => {

  const navigate = useNavigate();

  return (
    <div>
       <nav className="navbar">
            <Link className="heading" to={'/sign-in'}>
            QUIZOL
            </Link>
            <div className="navbarItems" id="navbarTogglerDemo02">
              <ul className="navbarNav">
                <li className="navItem">
                  <button className="navLink" onClick={()=>navigate('/sign-in')}> Login </button>
                </li>
                <li className="navItem">
                  <button className="navLink" onClick={()=>navigate('/sign-up')}> Sign up </button>
                </li>
              </ul>
            </div>
        </nav>
    </div>
  )
}

export default Navbar
