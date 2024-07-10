import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import MailIcon from '@mui/icons-material/Mail';

export default function Footer() {
  return (
    <div class="container-fluid pb-0 mb-0 justify-content-center text-light ">
      <footer>
        <div class="row my-5 justify-content-center py-5">
          <div class="col-11">
            <div class="row ">
                <p id="titleFooter">EyeGlasses</p>
              <div class="col-xl-2 col-md-4 col-sm-4 col-12">
                  <b id="links">קישורים מהירים</b>
                <ul class="list-unstyled">
                  <li>
                    <Link to="/" className="footer-links" as={Link}>
                      אודותינו
                    </Link>
                  </li>
                  <li>
                    <Link to="/branches" className="footer-links" as={Link}>
                      סניפים
                    </Link>
                  </li>
                  <li>
                    <Link to="/instructions" className="footer-links" as={Link}>
                    מדידת משקפיים
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div class="row ">
              <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-1 align-self-end ">
                <small className="footer-small">
                  <b>     <PhoneEnabledIcon/>:מספר טלפון  0583261047</b>
                </small>
              </div>
              <div class="col-xl-2 col-md-4 col-sm-4 col-auto order-2 align-self-end mt-3 ">
                <h6 class="text-muted bold-text">
                  <b> MailIcon  כותבת מייל  rsh61047@gmail.com</b>
                </h6>
                <small className="rights, footer-small">
                  <span>&copy;</span>2024 EyeGlasses כל הזכויות שמורות
                </small>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}