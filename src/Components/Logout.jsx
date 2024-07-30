import React from 'react'
import { logout } from '../Stores/reducer/auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout()).then(() => {
      navigate('/login')
    });
  }

  return (
    <div>
      <Link onClick={handleLogout} className='bg-red-500 px-2 py-3 mt-3 text-white font-bold rounded block text-center'>
        Logout
      </Link>
    </div>
  )
}

export default Logout
