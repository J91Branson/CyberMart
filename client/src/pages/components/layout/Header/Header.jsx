import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../../../images/logo.svg';

const Header = props => {
    const {
        title = 'Cyber Mart',
        url = 'http://localhost:3000'
    } = props;

    return (
        <header className="App-header">
            <a href={url}>
                <img src={logo} className="App-logo" alt="logo"/>
            </a>
            <h1 className="App-title">{title}</h1>
            <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string
};

export default Header;
