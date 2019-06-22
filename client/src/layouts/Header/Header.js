import React from 'react';
import PropTypes from 'prop-types';

const Header = props => {
    const {
        title = 'Cyber Mart',
    } = props;

    return (
        <header className="App-header">
            <h1 className="App-title">{title}</h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string
};

export default Header;
