import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../Stores/reducer/auth';
import Logout from '../Components/Logout';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer';
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';
import TimesAgo from '../Components/TimesAgo'

const Profile = ({ app_name }) => {
  const [showSpinner, setShowSpinner] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  CustomTitlePage({ title: 'Profile', app_name: app_name });
  useUserData();
  const isAdmin = userisAdmin();

  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  if (showSpinner || userData == null || isLoading) {
    return (
      <div>
        <div className="pt-5">
          <div className="container pt-5">
            <div className="row pt-5">
              <div className="col-lg-6 col-xl">
                <div className="text-container">
                  <Spinner />
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
  } else if (userData !== null && !isLoading) {
    const { first_name, last_name, role, middle_name, email, created_at } = userData;

    return (
      <div>
        <div className="pt-5">
          <div className="container pt-5">
            <div className="row pt-5">
              <div className="col-lg-6 col-xl">
                <div className="text-container">
                  <div className="section-title">Welcome Back{isAdmin && (<> Admin</>)}, {first_name}!</div>
                  <button
                    onClick={handleLogout}
                    style={{ float: 'right' }}
                    className="btn-solid-sm"
                  >
                    Logout
                  </button>
                  <div className="card" style={{ borderRadius: '20px' }}>
                    <div className="card-body">
                        <div className="row">
                          <div className="col-md-3">
                            Full Name
                          </div>
                          <div className="col-md">
                            {first_name} {middle_name} {last_name}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">
                            Email
                          </div>
                          <div className="col-md">
                            {email}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-3">
                            Joined: 
                          </div>
                          <div className="col-md">
                            <TimesAgo timestamp={created_at} />
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
                          <span className='btn-solid-sm fw-bold mt-3'>{ role.toUpperCase() } <i className='fa fa-user'></i></span>
                          <Link to="/profile/changepassword" className='btn-solid-sm mt-3'>Change Password <i className='fa fa-key'></i></Link>
                        </div>
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

export default Profile;
