import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { logout } from '../Stores/reducer/auth';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer';
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';
import { viewreport } from '../Stores/reducer/report';

const ViewReport = ({ app_name }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  CustomTitlePage({ title: 'View Single Report', app_name });
  useUserData();

  const isAdmin = userisAdmin();
  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const report = useSelector(state => state.report.viewReport);

  const api_url = process.env.APP_API_FRONT_URL;

  useEffect(() => {
    dispatch(viewreport(id));
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [dispatch, id]);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login');
    });
  };

  if (showSpinner || userData == null || isLoading || report == null) {
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

    const reportImage = api_url+report.evidenceURL;

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
                      <h4 className="text-center">{viewreport.title}</h4>
                      {viewreport.evidence && (
                        <>
                        </>
                      )}

                      <div className="card">
                        <div className="card-body text-center">
                          <img src={reportImage} alt={viewreport.title} width={100}/>
                        </div>
                      </div>
                      
                      <div className="pt-2">
                        <p><strong>Description:</strong> {viewreport.description}</p>
                        <p><strong>Category:</strong> {viewreport.category}</p>
                        <p><strong>Location:</strong> {viewreport.location}</p>
                        <p><strong>Incident Date:</strong> {new Date(viewreport.incident_date).toLocaleString()}</p>
                        <p><strong>Contact:</strong> {viewreport.contact}</p>
                        <p><strong>Reported On:</strong> {new Date(viewreport.created_at).toLocaleString()}</p>
                        <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'row', gap: 3 }}>
                          <Link to="/dashboard/myreport" className="btn btn-solid-sm mb-2">Back to Reports <i className='fa fa-arrow-left'></i></Link>
                          <button 
                            onClick={() => window.print()} 
                            className="btn btn-solid-sm mb-2"
                          >
                            Print <i className='fa fa-print'></i>
                          </button>
                        </div>
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

  return null;
};

export default ViewReport;
