import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom for navigation

const Header = () => {
  return (
    <header style={{ backgroundColor: '#f0f0f0', padding: '10px 20px' }}>
      <h1>Nasa Images</h1>
      <nav>
        <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
          <li style={{ display: 'inline', marginRight: '10px' }}>
            <Link to="/">Home</Link>  {/* Link to the home page */}
          </li>
          <li style={{ display: 'inline', marginRight: '10px' }}>
            <Link to="/nasa">NASA Page</Link>  {/* Link to the NASA page */}
          </li>
          {/* we can add links as needed */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
