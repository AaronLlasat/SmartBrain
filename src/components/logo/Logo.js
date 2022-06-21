import React from 'react';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
  return (
    <div className='Tilt h4 w4 shadow-2 pt3'>
        <img src={brain} alt='logo' style={{paddingTop:"10px"}}/>
    </div>
  );
};

export default Logo;