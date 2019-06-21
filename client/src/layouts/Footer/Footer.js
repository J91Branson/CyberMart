import React from 'react';
import './Footer.css';

const Footer = () => (
    <footer>
        &copy; Gorilla Syndicate 
        {( new Date()).getFullYear()}
    </footer>
);

export default Footer;
