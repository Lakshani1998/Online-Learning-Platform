import React from "react";
import { Link } from "react-router-dom";

export function Navbar(){
    return(
        <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/Home">LMS</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link text-dark" aria-current="page" to="/Home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/Courses">Courses</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/Student">Students</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link text-dark" to="/Enrollment">Enrollment</Link>
        </li>
      </ul>
    
    </div>
  </div>
</nav>
    );
}

export function Footer(){
    return(
        <footer>
            <div className="container p-3 mt-5 border-top"></div>
            <small className="d-block text-muted text-center">&copy; 2024 - Online Learning System</small>

        </footer>
    )
}