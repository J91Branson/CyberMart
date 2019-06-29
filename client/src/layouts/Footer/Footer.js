// Import React Packages
import React from 'react';
import { Link } from "react-router-dom";

// Import Files/Components
import './Footer.css';

const Footer = () => (
    <footer >
        <div>
            <br></br>
            <Link to="/contact" style={{color: "#484E5D"}}><i className="far fa-address-book"></i> Contact </Link>
            |
            <Link to="/about" style={{color: "#484E5D"}}> <i className="fas fa-book-reader"></i> About </Link>
        </div>
        <hr className="footerH"/>
        &copy; {(new Date()).getFullYear()} Gorilla Syndicate

    </footer>
);

export default Footer;
