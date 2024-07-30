import React from 'react'
import { Link } from 'react-router-dom'
import Owner from '../Components/Owner'
import CustomTitlePage from '../Components/CustomTitlePage'
import ImageContainer from '../Components/ImageContainer'
import AuthMiddleware from '../Components/AuthMiddleware'

const Home = ({ app_name }) => {
  CustomTitlePage({ title: 'Home', app_name: app_name })
  AuthMiddleware();
  return (
    <div>
      <div className="pt-5">
        <div className="container pt-5">
          <div className="row pt-5">
            <div className="col-lg-6 col-xl">
              <div className="text-container">
                <div className="section-title">{app_name}</div>
                <h2 className="h1-large">{app_name}</h2>
                <div className="p-large">
                  An Easy Platform Designed By a Final Year Project By:<br />
                  <Owner />
                </div>
                <div style={{ marginTop: 15, display: 'flex', flexDirection: 'row', gap: 10 }}>
                    <Link className="btn btn-solid-lg text-center w-50" to="/login">Login</Link>
                    <Link className="btn btn-solid-lg text-center w-50" to="/register">Register</Link>
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
  )
}

export default Home
