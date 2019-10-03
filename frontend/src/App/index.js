import React, { useEffect } from 'react';

import './styles.css';

import logo from '../Assets/logo.svg';

import Routes from '../Routes';

export default () => {
  useEffect(() => {
    // Set application name on window title
    window.document.title = process.env.REACT_APP_NAME;
  }, []);

  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />

      <div className="content">
        <Routes />
      </div>
    </div>
  );
};