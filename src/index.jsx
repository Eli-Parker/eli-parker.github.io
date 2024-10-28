import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'
import { Suspense } from 'react'
import LoadingScreen from './LoadingScreen.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))


root.render( <>
    <Canvas
        className='r3f'
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 6 ]
        } }
    >
        {/* Trigger loading screen until */}
        <Suspense fallback={ <LoadingScreen /> }>
            <Experience />
        </Suspense>
    </Canvas>
</>)