// Import React Packages
import React from 'react';
import { Link } from "react-router-dom";

// Import Files/Components
import './Footer.css';

const Footer = () => (
    <footer >
        <div className="mt-5">
            <Link to="/contact"> Contact </Link>
            |
            <Link to="/about"> About </Link>
        </div>
        <br></br>
        &copy; {(new Date()).getFullYear()} Gorilla Syndicate

    </footer>
);

export default Footer;
