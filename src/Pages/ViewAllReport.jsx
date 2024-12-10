import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../Stores/reducer/auth';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer';
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';
import { getallreport } from '../Stores/reducer/report';
import ReactPaginate from 'react-paginate';


const ViewAllReport = ({ app_name }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [currentPage, setCurrentPage] = useState(0); 
  const reportsPerPage = 2;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  CustomTitlePage({ title: 'View All Reports', app_name: app_name });
  useUserData();
  const isAdmin = userisAdmin();
  const userData = useSelector(state => state.auth.user);
  const isLoading = useSelector(state => state.auth.isLoading);
  const reports = useSelector((state) => state.report.allReport);

  useEffect(() => {
    dispatch(getallreport());
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

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  if (showSpinner || userData == null || isLoading || reports == null) {
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
  } else if (userData !== null && !isLoading && reports !== null) {
    
    const indexOfLastReport = (currentPage + 1) * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    const currentReports = reports?.reports.slice(indexOfFirstReport, indexOfLastReport) || [];

    const { first_name } = userData;
    const countreports = reports ? reports.reports.length : 0;

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
                      <h4 className="text-center">View All Reports <span className="badge bg-danger fw-bold">{countreports}</span></h4>
                      {currentReports.length == 0 ? (
                        <div className='alert alert-warning'><i className='fa fa-exclamation-triangle'></i> No reports available.</div>
                      ) : (
                        <>
                          
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>S/N</th>
                                  <th>Sender</th>
                                  <th>Title</th>
                                  <th>Category</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {currentReports.map((report, index) => (
                                  <tr key={report.id}>
                                    <td>{indexOfFirstReport + index + 1}.</td>
                                    <td>
                                        <span>{report.user.first_name+ ' ' +report.user.last_name} <br/ ></span>
                                        <span className='fw-bolder'>{ report.user.email }</span>

                                    </td>
                                    <td>{report.title}</td>
                                    <td>{report.category}</td>
                                    <td>
                                      <div style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
                                        <Link to={`/dashboard/myreport/view/${report.id}`} className='btn btn-danger mb-2 btn-sm'><i className='fa fa-eye'></i></Link>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            <div className="pagination">
                              <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={Math.ceil((reports?.reports.length || 0) / reportsPerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination"}
                                activeClassName={"bg-danger text-white active"}
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                              />

                            </div>
                          </div>
                        </>
                      )}
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

export default ViewAllReport;
