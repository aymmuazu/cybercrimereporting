import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../Stores/reducer/auth';
import useUserData from '../Components/UserData';
import CustomTitlePage from '../Components/CustomTitlePage';
import ImageContainer from '../Components/ImageContainer';
import Spinner from '../Components/Spinner';
import { userisAdmin } from '../Components/AuthMiddleware';
import { addreporttype, deleteReportType, getallreport, getreporttype } from '../Stores/reducer/report';
import CustomAlert from '../Components/CustomAlert';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';


const ViewReportTypes = ({ app_name }) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [disabled, setDisabled] = useState('');
  const [btnTitle, setBtnTitle] = useState('Add');
  const [alert, setAlert] = useState(false);
  const [alertTitle, setAlertTitle] = useState(false);
  const [alertBg, setAlertBg] = useState(false);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  CustomTitlePage({ title: 'View All Reports Types', app_name: app_name });
  useUserData();
  const isAdmin = userisAdmin();
  const userData = useSelector(state => state.auth.user);
  //const isLoading = useSelector(state => state.auth.isLoading);
  const reporttypes = useSelector((state) => state.report.reporttype);

  const handleSubmit = (e) => {
    e.preventDefault();
    setDisabled(false)
    setBtnTitle('Processing...')

    dispatch(addreporttype({ title })).then((action) => {
        switch (action.type) {
            case addreporttype.pending.type:
                setIsLoading(true);
                break;
        
            case addreporttype.rejected.type:
                setAlert(true);
                setAlertTitle('Something went wrong, check your inputs.');
                setAlertBg('alert-danger')

                setTimeout(() => {
                    setAlert(false); 
                    setDisabled(false);
                    setBtnTitle('Add')
                }, 2000);
                break;

            case addreporttype.fulfilled.type:
                setAlert(true);
                setAlertTitle(action.payload.message);
                setAlertBg('alert-success');

                // Reload report types
                dispatch(getreporttype());

                // Reset states
                setTitle('');
                setBtnTitle('Add');
                setTimeout(() => {
                    setAlert(false);
                    handleClose(); 
                }, 1000);
                break;
            default:
                break;
        }
    });
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this report type?")) {
        dispatch(deleteReportType(id)).then((action) => {
        if (action.type === deleteReportType.fulfilled.type) {
            setAlert(true);
            setAlertTitle("Report type deleted successfully.");
            setAlertBg("alert-success");

            // Dispatch getreporttype to reload the table
            dispatch(getreporttype());

            setTimeout(() => setAlert(false), 2000);
        } else {
            setAlert(true);
            setAlertTitle("Failed to delete the report type.");
            setAlertBg("alert-danger");

            setTimeout(() => setAlert(false), 2000);
        }
        });
    }
  };



  useEffect(() => {
    dispatch(getreporttype());
    
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

  if (showSpinner || userData == null || isLoading || reporttypes == null) {
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
  } else if (userData !== null || !isLoading || reporttypes == null) {

    const { first_name } = userData;
   
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
                      <h4 className="text-center">View Report Types</h4>

                        <div>
                            <button
                                type="button"
                                className="btn-solid-sm mb-2"
                                onClick={handleShow}
                            >
                                Add Report Type
                            </button>

                            {showModal && (
                                <div
                                    className="modal fade show"
                                    tabIndex="-1"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                    style={{ display: 'block' }}
                                >
                                <div className="modal-dialog" style={{ width: '40%' }}>
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Add Report Type</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={handleClose}
                                                aria-label="Close"
                                            />
                                        </div>
                                        <div className="modal-body">
                                            <form onSubmit={handleSubmit}>
                                                {alert && (<CustomAlert title={alertTitle} bg={alertBg} />)}
                                                <CustomInput 
                                                    LabelTitle="Title" 
                                                    inputAction={setTitle} 
                                                    type="text" 
                                                    name="title" 
                                                    isRequired={true}
                                                />
                                                
                                                <CustomButton title={btnTitle} disabled={disabled}/>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                </div>
                            )}
                            </div>                        

                        <>
                          <div className="table-responsive">
                            <table className="table table-bordered">
                              <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {reporttypes.data.map((reportType, index) => (
                                    <tr key={reportType.id || index}>
                                        <td>{reportType.title}</td>
                                        <td>
                                            <button
                                                className="btn-solid-sm"
                                                onClick={() => handleDelete(reportType.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                              </tbody>
                            </table>

                          </div>
                        </>
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

export default ViewReportTypes;
