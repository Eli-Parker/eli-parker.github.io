import './style.css'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense, useState } from 'react'
import LoadingScreen from './LoadingScreen.jsx'
import { isMobile } from 'react-device-detect';
import { Perf } from 'r3f-perf'
import { useControls } from 'leva';

/**
 * The application
 * @returns A mobile warning if the user is on mobile, the experience otherwise
 */
export default function App() 
{
    const [continueTo3D, setContinueTo3D] = useState(false);


    const { showPerf } = useControls({ showPerf: false });

    // Mobile experience
    if (isMobile && !continueTo3D) {
        return(
        <>
            <div className="mobile-screen" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h3>Warning: This experience is <br/> not optimized for mobile devices,<br/> are you sure you want to continue? <br/><br/> Redirect will take you to<br/> a standard portfolio.</h3>
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
        return <Canvas
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
        {showPerf ? <Perf position='top-left'/> : null}
        </Canvas>
    }
}