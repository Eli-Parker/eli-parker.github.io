import './style.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense, useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen.jsx'
import { isMobile } from 'react-device-detect';
import { Perf } from 'r3f-perf'
import { Leva, useControls } from 'leva';
import React from 'react'

/**
 * Holds the entire app, and throws the mobile user warning 
 * @returns A mobile warning if the user is on mobile, the experience otherwise
 */
export default function App() 
{
    /**
     * Define whether we're in debug mode or not
     */
    const [isDebug, setDebug] = useState(window.location.hash !== '#debug')

    /**
     * Update debug mode if it changes
     */
    useEffect
    (() => {
        const handleHashChange = () => {
            setDebug(window.location.hash !== '#debug');
        };

        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    /**
     * Controls whether the mobile experience goes to the 3d experience.
     */
    const [continueTo3D, setContinueTo3D] = useState(false);

    /**
     * Allows the r3f perf to be toggleable.
     */
    const { showPerf } = useControls({ showPerf: false });

    // Mobile experience
    if (isMobile && !continueTo3D) {
        return(
        <>
            <div className="mobile-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Notice: This is an interactive 3D experience<br/>which isn't optimized for mobile devices,<br/> do you still want to continue? <br/><br/> Redirect will take you to<br/>a mobile friendly portfolio.</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="button-1" role="button" onClick={() => setContinueTo3D(true)}>Continue</button>
                <button className="button-1" role="button" onClick={() => window.location.href = 'https://eliparker.dev/react-site/'}>Redirect</button>
            </div>
            </div>
        </>)
    }

    // Regular Desktop experience
    else
    {
        return <> 
        {/* Show debug controls if #debug is at the end of the url */}
        <Leva hidden={isDebug} />
        <Canvas
            className='r3f'
            camera={ {
                fov: 45,
                near: 0.1,
                far: 20,
                position: [ -3, 1.5, 6 ]
            } }
        >
        {/* Trigger loading screen until loading finishes */}
        <Suspense fallback={ <LoadingScreen /> }>
            <Experience />
        </Suspense>

        {/* Show performance if it's enabled by the user */}
        {showPerf && <Perf position='top-left'/>}
        </Canvas>
    </>
    }
}