import React from 'react'
import { deletereport, getreport } from '../Stores/reducer/report';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DeleteReport = ({ reportId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteReport = (e, reportId) => {
    e.preventDefault();
    dispatch(deletereport(reportId)).then(() => {
      dispatch(getreport());
    });
  }

  return (
    <>
      <Link onClick={(e) => handleDeleteReport(e, reportId)} className='btn btn-danger mb-2 btn-sm'><i className='fa fa-trash'></i></Link>
    </>
  )
}

export default DeleteReport
