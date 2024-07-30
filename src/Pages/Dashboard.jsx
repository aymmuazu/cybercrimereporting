import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../Stores/reducer/auth';
import Logout from '../Components/Logout';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer'
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';

const Dashboard = ({ app_name }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  CustomTitlePage({ title: 'Dashboard', app_name: app_name })
  useUserData();
  const isAdmin = userisAdmin();

  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login')
    });
  }

  if (userData == null && isLoading) {
    return(
      <Spinner />
    )
  }
  else if (userData !== null && !isLoading) {
    const {first_name, email } = userData;

    return (
      <div>
        <div className="pt-5">
          <div className="container pt-5">
            <div className="row pt-5">
              <div className="col-lg-6 col-xl">
                <div className="text-container">
                  <div className="section-title">Welcome Back {isAdmin && (<>Admin,</>)} {first_name }!</div>
                  <button
                    onClick={handleLogout}
                    style={{ float: 'right' }} 
                    className="btn-solid-sm"
                  >
                    Logout
                  </button>
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-body">
                      <a href="#" className="btn-solid-lg mb-2 w-100 text-center fs-5">
                        My Reports (0)
                      </a>
                      <a href="#" className="btn-solid-lg mb-2 w-100 text-center fs-5">
                        Add Reports
                      </a>
                      <a href="#" className="btn-solid-lg mb-2 w-100 text-center fs-5">
                        Email Reminder
                      </a>
                    </div>
                  </div>
                </div>
                </div>
              <div className="col-lg-6 col-xl">
                <ImageContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default Dashboard;