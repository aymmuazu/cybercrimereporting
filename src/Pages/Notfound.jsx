import React from 'react'
import { Link } from 'react-router-dom'
import BgImage from '../assets/images/header-illustration.svg'

const Notfound = ({ app_name }) => {
  return (
    <div>
      <div className="pt-5">
        <div className="container pt-5">
          <div className="row pt-5">
            <div className="col-lg-6 col-xl">
              <div className="text-container">
                <div className="section-title">Page not found.</div>
                <h2 className="h1-large">The page or resource not found!</h2>
                <div className="p-large">
                  Let's take you back home.
                </div>
                <div className="pt-2">
                  <Link className="btn-solid-lg" to="/">Let's go back</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-xl">
              <div className="image-container">
                <img className="img-fluid" src={BgImage} alt="alternative" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notfound
