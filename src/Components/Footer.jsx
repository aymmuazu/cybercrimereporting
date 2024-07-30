import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import DecorationCityImage from '../assets/images/decoration-city.svg'

const Footer = () => {
  return (
    <>
      <div className="footer bg-gray">
        <img className="decoration-city" src={DecorationCityImage} alt="alternative" />
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h4>Cybercrime Reporting and Analysis Platform: Enhancing Incident Response and Cybersecurity in Nigeria</h4>
              <div className="social-container">
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-facebook-f fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-twitter fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-pinterest-p fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-instagram fa-stack-1x"></i>
                  </a>
                </span>
                <span className="fa-stack">
                  <a href="#your-link">
                    <i className="fas fa-circle fa-stack-2x"></i>
                    <i className="fab fa-youtube fa-stack-1x"></i>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copyright bg-gray">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <ul className="list-unstyled li-space-lg p-small">
                <li><a href="#">Terms & Conditions</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
            <div className="col-lg">
              <p className="p-small statement">
                Copyright © <a href="#">{new Date().getFullYear()}</a> Students Project Work
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
