import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {
        if (isSignedIn) {
            return(
            <nav style={{display: 'flex', justifyContent: 'flex-end', marginRight:"20px"}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer' style={{position:"relative", zIndex:1}}>Sign Out</p>
            </nav>
            )
        } else {
            return(
            <>
                <nav className='tr mr4 db'>
                    <p onClick={() => onRouteChange('signin')} className='f3 link dim dib black underline pa3 pointer' style={{position:"relative", zIndex:1}}>Sign In</p>
                    <p onClick={() => onRouteChange('register')} className='f3 link dim dib black underline pa3 pointer' style={{position:"relative", zIndex:1}}>Register</p>
                </nav>
            </>
            )
        }
        
    
}

export default Navigation;