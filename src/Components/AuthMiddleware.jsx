import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AuthMiddleware = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        navigate('/dashboard');
    }
  }, [navigate])
}

export const userAlreadyLoggedIn = () => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
        return true;
    }else{
        return false;
    }
}

export const userisAdmin = () => {
    const userData = useSelector(state => state.auth.user);
    const isLoading = useSelector(state => state.auth.isLoading);

    if (userData == null && isLoading) {
        return false
    }
    else if(userData !== null && !isLoading){
        const {role } = userData;
        if (role == 'admin') {
         return true;   
        }
        return false
    }
}


export default AuthMiddleware;
