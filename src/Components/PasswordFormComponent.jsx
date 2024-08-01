import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import { useDispatch } from 'react-redux'
import Spinner from './Spinner'
import CustomAlert from './CustomAlert'
import {changepassword} from '../Stores/reducer/user'

const PasswordFormComponent = ({ }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [disabled, setDisabled] = useState('');
    const [btnTitle, setBtnTitle] = useState('Change Password');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState(false);
    const [alertBg, setAlertBg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(false)
        setBtnTitle('Processing...')
        
        dispatch(changepassword({ current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmPassword })).then((action) => {
            switch (action.type) {
                case changepassword.pending.type:
                    setIsLoading(true);
                    break;
            
                case changepassword.rejected.type:
                    setAlert(true);
                    setAlertTitle('Something went wrong, check your inputs.');
                    setAlertBg('alert-danger')

                    setTimeout(() => {
                       setAlert(false); 
                       setDisabled(false);
                       setBtnTitle('Change Password')
                    }, 2000);
                    break;

                case changepassword.fulfilled.type:
                    setAlert(true);
                    setAlertTitle(action.payload.message);
                    setAlertBg('alert-success')

                    setTimeout(() => {
                       navigate('/profile');
                    }, 2000);
                    break;
                default:
                    break;
            }
        })
    }

  return (
    <div>
       {isLoading ? (
            <Spinner />
       ) : (
        <>
            <form onSubmit={handleSubmit}>
                {alert && (<CustomAlert title={alertTitle} bg={alertBg} />)}
                <CustomInput LabelTitle="Current Password" inputAction={setCurrentPassword} type="password" name="current_password" isRequired={true}/>
                <CustomInput LabelTitle="New Password" inputAction={setNewPassword} type="password" name="new_password" isRequired={true}/>
                <CustomInput LabelTitle="Confirm Password" inputAction={setConfirmPassword} type="password" name="confirm_password" isRequired={true}/>
                <CustomButton title={btnTitle} disabled={disabled}/>
            </form>
        </>        
       )}
    </div>
  )
}

export default PasswordFormComponent
