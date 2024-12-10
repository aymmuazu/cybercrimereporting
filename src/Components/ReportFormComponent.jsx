import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner';
import CustomAlert from './CustomAlert';
import { addreport, getreporttype } from '../Stores/reducer/report';

const ReportFormComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reportTitle, setReportTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [incidentDate, setIncidentDate] = useState('');
    const [location, setLocation] = useState('');
    const [evidence, setEvidence] = useState(null);
    const [contact, setContact] = useState('');

    const [disabled, setDisabled] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Add');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBg, setAlertBg] = useState('');
    const allreportTypes = useSelector(state => state.report.reporttype);

    let reportTypes = null;

    if (allreportTypes) {
        reportTypes = allreportTypes.data;
    }

    useEffect(() => {
        dispatch(getreporttype());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        setBtnTitle('Processing...');
        
        const formData = new FormData();
        formData.append('title', reportTitle);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('incident_date', incidentDate);
        formData.append('location', location);
        if (evidence) formData.append('evidence', evidence);
        formData.append('contact', contact);

        dispatch(addreport(formData)).then((action) => {
            setIsLoading(false);
            switch (action.type) {
                case addreport.pending.type:
                    setIsLoading(true);
                    break;
                case addreport.rejected.type:
                    setAlert(true);
                    setAlertTitle('Something went wrong, check your inputs.');
                    setAlertBg('alert-danger');

                    setTimeout(() => {
                        setAlert(false);
                        setDisabled(false);
                        setBtnTitle('Add');
                    }, 2000);
                    break;
                case addreport.fulfilled.type:
                    setAlert(true);
                    setAlertTitle('Report submitted successfully!');
                    setAlertBg('alert-success');

                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 2000);
                    break;
                default:
                    break;
            }
        });
    };

    return (
        <div>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form onSubmit={handleSubmit}>
                        {alert && (<CustomAlert title={alertTitle} bg={alertBg} />)}
                        
                        <CustomInput LabelTitle="Report Title" inputAction={setReportTitle} type="text" name="report_title" isRequired={true} />
                        <CustomInput LabelTitle="Description" inputAction={setDescription} type="textarea" name="description" isRequired={true} />
                        <CustomInput 
                            LabelTitle="Category" 
                            inputAction={setCategory} 
                            type="select" 
                            name="category" 
                            isRequired={true} 
                            options={reportTypes ? reportTypes.map((reportType) => reportType.title) : []} 
                        />

                        <CustomInput LabelTitle="Date and Time of Incident" inputAction={setIncidentDate} type="datetime-local" name="incident_date" isRequired={true} />
                        <CustomInput LabelTitle="Location" inputAction={setLocation} type="text" name="location" isRequired={true} />
                        <CustomInput LabelTitle="Evidence (optional)" inputAction={setEvidence} type="file" name="evidence" isRequired={false} />
                        <CustomInput LabelTitle="Contact Information (optional)" inputAction={setContact} type="text" name="contact" isRequired={false} />

                        <CustomButton title={btnTitle} disabled={disabled} />
                    </form>
                </>
            )}
        </div>
    );
};

export default ReportFormComponent;
