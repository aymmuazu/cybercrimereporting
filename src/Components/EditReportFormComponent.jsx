import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { useDispatch } from 'react-redux';
import Spinner from './Spinner';
import CustomAlert from './CustomAlert';
import { editreport } from '../Stores/reducer/report';

const EditReportFormComponent = ({ report }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize state with existing report values
    const [reportTitle, setReportTitle] = useState(report?.title || '');
    const [description, setDescription] = useState(report?.description || '');
    const [category, setCategory] = useState(report?.category || '');
    const [incidentDate, setIncidentDate] = useState(report?.incident_date || '');
    const [location, setLocation] = useState(report?.location || '');
    const [evidence, setEvidence] = useState(null);
    const [contact, setContact] = useState(report?.contact || '');

    const [disabled, setDisabled] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Update');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBg, setAlertBg] = useState('');

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
        formData.append('id', report.id);
        if (evidence) formData.append('evidence', evidence);
        formData.append('contact', contact);

        dispatch(editreport(formData)).then((action) => {
            setIsLoading(false);
            switch (action.type) {
                case editreport.pending.type:
                    setIsLoading(true);
                    break;
                case editreport.rejected.type:
                    setAlert(true);
                    setAlertTitle('Something went wrong, check your inputs.');
                    setAlertBg('alert-danger');

                    setTimeout(() => {
                        setAlert(false);
                        setDisabled(false);
                        setBtnTitle('Update');
                    }, 2000);
                    break;
                case editreport.fulfilled.type:
                    setAlert(true);
                    setAlertTitle('Report Edited successfully!');
                    setAlertBg('alert-success');

                    setTimeout(() => {
                        navigate('/dashboard/myreport');
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
                        
                        <CustomInput 
                            LabelTitle="Report Title" 
                            value={reportTitle} 
                            inputAction={setReportTitle} 
                            type="text" 
                            name="report_title" 
                            isRequired={true} 
                        />
                        <CustomInput 
                            LabelTitle="Description" 
                            value={description} 
                            inputAction={setDescription} 
                            type="textarea" 
                            name="description" 
                            isRequired={true} 
                        />
                        <CustomInput 
                            LabelTitle="Category" 
                            value={category} 
                            inputAction={setCategory} 
                            type="select" 
                            name="category" 
                            isRequired={true} 
                            options={['Phishing', 'Identity Theft', 'Malware']} 
                        />
                        <CustomInput 
                            LabelTitle="Date and Time of Incident" 
                            value={incidentDate} 
                            inputAction={setIncidentDate} 
                            type="datetime-local" 
                            name="incident_date" 
                            isRequired={true} 
                        />
                        <CustomInput 
                            LabelTitle="Location" 
                            value={location} 
                            inputAction={setLocation} 
                            type="text" 
                            name="location" 
                            isRequired={true} 
                        />
                        <CustomInput 
                            LabelTitle="Evidence (optional)" 
                            inputAction={setEvidence} 
                            type="file" 
                            name="evidence" 
                            isRequired={false} 
                        />
                        <CustomInput 
                            LabelTitle="Contact Information (optional)" 
                            value={contact} 
                            inputAction={setContact} 
                            type="text" 
                            name="contact" 
                            isRequired={false} 
                        />

                        <CustomButton title={btnTitle} disabled={disabled} />
                    </form>
                </>
            )}
        </div>
    );
};

export default EditReportFormComponent;
