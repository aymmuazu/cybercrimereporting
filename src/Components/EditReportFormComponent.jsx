import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import Spinner from './Spinner';
import CustomAlert from './CustomAlert';
import { editreport } from '../Stores/reducer/report';

const EditReportFormComponent = ({ report }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Initialize state with existing report values
    const [formData, setFormData] = useState({
        title: report?.title || '',
        description: report?.description || '',
        category: report?.category || '',
        incident_date: report?.incident_date || '',
        location: report?.location || '',
        evidence: null,
        contact: report?.contact || '',
    });

    const [disabled, setDisabled] = useState(false);
    const [btnTitle, setBtnTitle] = useState('Update');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertBg, setAlertBg] = useState('');

    // Handle form changes
    const handleChange = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(true);
        setBtnTitle('Processing...');

        const submissionData = new FormData();
        
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                submissionData.append(key, formData[key]);
            }
        });
        submissionData.append('id', report?.id || '');

        dispatch(editreport(submissionData)).then((action) => {
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
                <form onSubmit={handleSubmit}>
                    {alert && <CustomAlert title={alertTitle} bg={alertBg} />}

                    <CustomInput
                        LabelTitle="Report Title"
                        value={formData.title}
                        inputAction={(value) => handleChange('title', value)}
                        type="text"
                        name="title"
                        isRequired={true}
                    />
                    <CustomInput
                        LabelTitle="Description"
                        value={formData.description}
                        inputAction={(value) => handleChange('description', value)}
                        type="textarea"
                        name="description"
                        isRequired={true}
                    />
                    <CustomInput
                        LabelTitle="Category"
                        value={formData.category}
                        inputAction={(value) => handleChange('category', value)}
                        type="select"
                        name="category"
                        isRequired={true}
                        options={['Phishing', 'Identity Theft', 'Malware']}
                    />
                    <CustomInput
                        LabelTitle="Date and Time of Incident"
                        value={formData.incident_date}
                        inputAction={(value) => handleChange('incident_date', value)}
                        type="datetime-local"
                        name="incident_date"
                        isRequired={true}
                    />
                    <CustomInput
                        LabelTitle="Location"
                        value={formData.location}
                        inputAction={(value) => handleChange('location', value)}
                        type="text"
                        name="location"
                        isRequired={true}
                    />
                    <CustomInput
                        LabelTitle="Evidence (optional)"
                        inputAction={(file) => handleChange('evidence', file)}
                        type="file"
                        name="evidence"
                        isRequired={false}
                    />
                    <CustomInput
                        LabelTitle="Contact Information (optional)"
                        value={formData.contact}
                        inputAction={(value) => handleChange('contact', value)}
                        type="text"
                        name="contact"
                        isRequired={false}
                    />

                    <CustomButton title={btnTitle} disabled={disabled} />
                </form>
            )}
        </div>
    );
};

export default EditReportFormComponent;
