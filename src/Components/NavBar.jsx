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
                  <Link className="nav-link" to="/">Home <i className='fa fa-home'></i></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login <i className='fa fa-sign-out'></i></Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register <i className='fa fa-sign-out'></i></Link>
                </li>
             </>
            ): (
              <>

              <li className="nav-item">
                <Link className="nav-link text-danger" aria-current="page" to="/dashboard"><i className='fa fa-dashboard'></i> Dashboard</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/myreport">My Reports <i className='fa fa-book'></i></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">Profile <i className='fa fa-user'></i></Link>
              </li>
                
              </>
            )}
          </ul>

          {check ? (
              <span className="nav-item">
                <Link className="btn-solid-sm bg-danger border-danger text-white" onClick={handleLogout}>Logout <i className='fa fa-sign-in'></i></Link>
              </span>
          ) : (
            <span className="nav-item">
              <Link className="btn-solid-sm bg-danger border-danger text-white" to="/register" >Get Started <i className='fa fa-sign-in'></i></Link>
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
