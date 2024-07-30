import React from 'react'
import CustomTitlePage from '../Components/CustomTitlePage'
import RegisterFormComponent from '../Components/RegisterFormComponent'
import ImageContainer from '../Components/ImageContainer'
import AuthMiddleware from '../Components/AuthMiddleware'

const Register = ({ app_name }) => {
  CustomTitlePage({ title: 'Register', app_name: app_name })
  AuthMiddleware();
  return (
    <div>
      <div className="pt-5">
        <div className="container pt-5">
          <div className="row pt-5">
            <div className="col-lg-6 col-xl">
              <div className="text-container">
                <div className="section-title">Once you are registered, have an account now.</div>
                  <div className="card" style={{ borderRadius: 20 }}>
                      <h2 className="h1-large text-center mt-2">Create an account</h2>
                      <div className="card-body">
                         <RegisterFormComponent isRegister={true} />
                      </div>
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

export default Register
