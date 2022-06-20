import React from 'react';
import './Logo.css';
import brain from './brain.png';


const Logo = () => {
  return (
    <div className='Tilt h4 w4 shadow-2 pt3'>
        <img src={brain} alt='logo' style={{paddingTop:"10px"}}/>
    </div>
    // <div className='ma4 mt0'>
    //     <Tilt tiltAxis='x' perspective='600'>
    //         <div className='Tilt h4 w4 br2 shadow-2 pt3'>
    //             <img src={brain} alt='logo' style={{paddingTop:"10px"}}/>
    //         </div>
    //     </Tilt>
    // </div>
  );
};

export default Logo;