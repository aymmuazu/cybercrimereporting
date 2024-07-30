import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userAlreadyLoggedIn } from './AuthMiddleware';
import { useDispatch } from 'react-redux';
import { logout } from '../Stores/reducer/auth';

const Navbar = ({ app_name }) => {
  const check = userAlreadyLoggedIn();
  const dispatch  = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login')
    })
  }

  return (
    <nav id="navbarExample" className="navbar navbar-expand-lg fixed-top navbar-light" aria-label="Main navigation">
      <div className="container">
        <Link to="/" style={{ textDecoration: 'none' }} className="navbar-brand link fw-bold">{app_name}</Link>

        <button className="navbar-toggler p-0 border-0" type="button" id="navbarSideCollapse" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="navbar-collapse offcanvas-collapse" id="navbarsExampleDefault">
          <ul className="navbar-nav ms-auto navbar-nav-scroll">
            {check == false ? (
             <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
             </>
            ): (
              <>

              <li className="nav-item">
                <Link className="nav-link text-danger" aria-current="page" to="/dashboard">Dashboard</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/login">My Reports</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">Profile</Link>
              </li>
                
              </>
            )}
          </ul>

          {check ? (
              <span className="nav-item">
                <Link className="btn-solid-lg" onClick={handleLogout}>Logout</Link>
              </span>
          ) : (
            <span className="nav-item">
              <Link className="btn-solid-lg" to="/login" >Get Started <i className='fa fa-sign-in'></i></Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
