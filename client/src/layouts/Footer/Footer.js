import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer >
        &copy; {( new Date()).getFullYear()} Gorilla Syndicate
    </footer>
);

export default Footer;
