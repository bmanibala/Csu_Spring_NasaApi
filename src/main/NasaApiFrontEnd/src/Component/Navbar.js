import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '20px', background: '#f0f0f0' }}>
      <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-around' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/nasa">NASA Images</Link>
        </li>
        {/* we cam add more navigation links as needed */}
      </ul>
    </nav>
  );
}

export default Navbar;