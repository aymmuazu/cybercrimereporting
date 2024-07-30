import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustomInput from './CustomInput'
import CustomButton from './CustomButton'
import { useDispatch } from 'react-redux'
import Spinner from './Spinner'
import CustomAlert from './CustomAlert'
import {login} from '../Stores/reducer/auth'

const LoginFormComponent = ({ isLogin, isRegister }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [disabled, setDisabled] = useState('');
    const [btnTitle, setBtnTitle] = useState('Login');
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState(false);
    const [alertBg, setAlertBg] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDisabled(false)
        setBtnTitle('Processing...')
        
        dispatch(login({ email, password })).then((action) => {
            switch (action.type) {
                case login.pending.type:
                    setIsLoading(true);
                    break;
            
                case login.rejected.type:
                    setAlert(true);
                    setAlertTitle('Something went wrong, check your inputs.');
                    setAlertBg('alert-danger')

                    setTimeout(() => {
                       setAlert(false); 
                       setDisabled(false);
                       setPassword(null);
                       setBtnTitle('Login')
                    }, 2000);
                    break;

                case login.fulfilled.type:
                   
                    setAlert(true);
                    setAlertTitle(action.payload.message);
                    setAlertBg('alert-success');

                    localStorage.setItem('access_token', action.payload.access_token);

                    setTimeout(() => {
                       navigate('/dashboard');
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
           
            <CustomInput LabelTitle="Email" inputAction={setEmail} type="email" name="email" isRequired={true}/>
            <CustomInput LabelTitle="Password" inputAction={setPassword} type="password" name="password" isRequired={true}/>
            
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

export default LoginFormComponent
