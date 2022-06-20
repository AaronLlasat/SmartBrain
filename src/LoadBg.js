import React, { useCallback } from 'react';
import './App.css';
import particlesOptions from "./particles.json";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";




function LoadBg() {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    return (
        <>
            <Particles options={particlesOptions} init={particlesInit} className='particles'/>
        </>
    );
}

export default LoadBg;
