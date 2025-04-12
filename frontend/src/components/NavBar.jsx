import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/" style={{ margin: '0 10px', textDecoration: 'none', color: '#333' }}>
        Home
      </Link>
    </nav>
  );
};

export default Navbar;
