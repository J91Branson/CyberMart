// Import React Packages
import React from 'react';
import { Link } from "react-router-dom";

// Import Files/Components
import './Footer.css';

const Footer = () => (
    <footer >
        <div className="footerL">
            <hr className="footerH"/>
            <Link className="footer-size" to="/contact" style={{color: "#484E5D"}}><i className="far fa-address-book"></i> Contact </Link>
            |
            <Link className="footer-size" to="/about" style={{color: "#484E5D"}}><i className="fas fa-users"></i> Team </Link>
        </div>

        &copy; {(new Date()).getFullYear()} Gorilla Syndicate

    </footer>
);

export default Footer;
