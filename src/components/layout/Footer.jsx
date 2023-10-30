import React from "react";
import logo from "../../images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="info">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>JOBSTAR</span>
        </div>
        <hr />
        <p>
          Gmail: <a href="mailto:jobstar@example.com">jobstar@example.com</a>
        </p>
        <p>
          Phone: <a href="tel:+0123456789">+0123456789</a>
        </p>

        <p>
          Address:{" "}
          <a href="https://maps.app.goo.gl/f47qg4zwB55GXkfc7">
            District 1, Ho Chi Minh City
          </a>
        </p>
      </div>

      <div className="info">
        <div className="title">
          <h1>About Us</h1>
        </div>
        <hr />
        <p>Support Center</p>
        <p>Customer Support</p>

        <p>Terms & Conditions</p>
      </div>

      <div className="info">
        <div className="title">
          <h1>Policy</h1>
        </div>
        <hr />
        <p>Application Security</p>
        <p>Softwere Principles</p>

        <p>Unwanted Softwere</p>
      </div>

      <div className="info">
        <div className="title">
          <h1>Others</h1>
        </div>
        <hr />
        <p>
          Facebook:{" "}
          <a href="https://www.facebook.com/">www.facebook.com/jobstar</a>
        </p>
        <p>
          Linkedin:{" "}
          <a href="https://www.linkedin.com/">www.linkedin.com/jobstar</a>
        </p>

        <p>© 2023 JOBSTAR. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
