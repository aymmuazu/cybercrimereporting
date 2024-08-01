import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser, logout } from '../Stores/reducer/auth';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer';
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';
import { viewreport } from '../Stores/reducer/report';
import EditReportFormComponent from '../Components/EditReportFormComponent';

const EditReport = ({ app_name }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  CustomTitlePage({ title: 'Edit Report', app_name: app_name });
  useUserData();

  const isAdmin = userisAdmin();
  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const report = useSelector((state) => state.report.viewReport);

  useEffect(() => {
    dispatch(viewreport(id));
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };


  if (showSpinner || (userData == null && isLoading && report == null)) {
   
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
  } else if (userData !== null && !isLoading && report !== null) { 
    const { first_name } = userData;
    const viewreport = report.report;
    
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
                      <h4 className="text-center">Edit Report <i className='fa fa-edit'></i></h4>
                      <EditReportFormComponent report={viewreport} />
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

  return null;
};

export default EditReport;
