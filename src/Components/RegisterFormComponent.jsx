import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import { useDispatch } from 'react-redux'
import Spinner from './Spinner'
import CustomAlert from './CustomAlert'
import {register} from '../Stores/reducer/auth'

const RegisterFormComponent = ({ isLogin, isRegister }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [disabled, setDisabled] = useState('');
    const [btnTitle, setBtnTitle] = useState('Register');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState(false);
    const [alertBg, setAlertBg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(false)
        setBtnTitle('Processing...')
        
        dispatch(register({ first_name: firstName, middle_name: middleName, last_name: lastName, email, password, password_confirmation: confirmPassword })).then((action) => {
            switch (action.type) {
                case register.pending.type:
                    setIsLoading(true);
                    break;
            
                case register.rejected.type:
                    setAlert(true);
                    setAlertTitle('Something went wrong, check your inputs.');
                    setAlertBg('alert-danger')

                    setTimeout(() => {
                       setAlert(false); 
                       setDisabled(false);
                       setBtnTitle('Register')
                    }, 2000);
                    break;

                case register.fulfilled.type:
                    setAlert(true);
                    setAlertTitle(action.payload.message);
                    setAlertBg('alert-success')

                    setTimeout(() => {
                       navigate('/login');
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

       <form onSubmit={handleSubmit}>
            {alert && (<CustomAlert title={alertTitle} bg={alertBg} />)}
            <div className="row">
                <div className="col-md">
                    <CustomInput LabelTitle="First Name" inputAction={setFirstName} type="text" name="first_name" isRequired={true}/>
                </div>
                <div className="col-md">
                    <CustomInput LabelTitle="Middle Name" inputAction={setMiddleName} type="text" name="middle_name" isRequired={true}/>
                </div>
                <div className="col-md">
                    <CustomInput LabelTitle="Last Name" inputAction={setLastName} type="text" name="last_name" isRequired={true}/>
                </div>
            </div>
            <CustomInput LabelTitle="Email" inputAction={setEmail} type="email" name="email" isRequired={true}/>
            <CustomInput LabelTitle="Password" inputAction={setPassword} type="password" name="password" isRequired={true}/>
            <CustomInput LabelTitle="Confirm Password" inputAction={setConfirmPassword} type="password" name="confirm_password" isRequired={true}/>
            
            <CustomButton title={btnTitle} disabled={disabled}/>
        </form>
       )}

        {isLogin ? (
            <p>Not yet have an account ? <Link to="/register" className="text-danger">Register</Link></p>
        ): (
            <p>Already have an account ? <Link to="/Login" className="text-danger">Login</Link></p>
        )}

        
    </div>
  )
}

export default RegisterFormComponent
