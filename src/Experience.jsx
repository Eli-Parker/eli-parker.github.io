import { Html, Environment, Float, ContactShadows, PresentationControls } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'
import LaptopScene from './homepage/LaptopScene'
import ProjectsScene from './projects/ProjectsScene'
import { useControls } from 'leva'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'

/**
 * Contains the full R3F experience
 * @returns the R3F experience
 */
export default function Experience()
{
    // Toggle for finished loading
    const [loading, setLoading] = useState(true)
    
    // Toggle for animation
    const [animating, setAnimating] = useState(false)

    // Currently selected page set to start so we can animate in
    const [currentPageName, setCurrentPageName] = useState("start")

    // Loading opacity for animation
    const [loadPlaneOp, setloadPlaneOp] = useState(1)

    // Page refs
    const home = useRef()
    const projects = useRef()
    // Sotore all pages as objects for switching
    const [pages] = useState(
    [{
        name: 'home',
            page: home
    }, 
    {
        name: 'projects',
            page: projects
    }])

    // Ref for loading plane
    const loadingPlane = useRef()

    // Import camera for gsap animation
    const { camera } = useThree();

    // Called on first render
    useEffect(() => {
        console.log("first load")
        // Define load function async
        async function load() {
            await SetPage('home')
            console.log("First load after first setpage")

            await new Promise(r => setTimeout(r, 50))
            
            let tries = 0

            // If scale is still zero animation failed, force it to keep going until it does
            while(home.current.scale.x === 0 && tries < 5)
            {
                console.warn("Home is still not showing after it should be, retrying")
                console.log(home.current.scale)
                setCurrentPageName("start")
                await SetPage('home')
                tries++;
            }

            if(tries == 5){
                // Redirect to regular portfolio since there is clearly something wrong with our code or their computer
                window.location.href = 'https://eliparker.dev/react-site/';
            }
            console.log(loadingPlane.current)
            // Animate opacity for fade animation
            gsap.to(loadingPlane.current.material, {
                duration: 0.5,
                opacity: 0,
                ease: "power2.inOut",
                onUpdate: () => {
                    // Sync values and update camera
                    setloadPlaneOp(loadingPlane.current.material.opacity)
                    loadingPlane.current.material.needsUpdate = true;
                    camera.updateProjectionMatrix();
                    console.log(loadingPlane.current.material.opacity)
                },
                onComplete: () => {
                    setLoading(false);
                }
            });
            
        }

        load()

    }, [])


    /**
     * Sets the current page
     * @param {*} pageName the name of selected page.
     */
    async function SetPage(pageName)
    {
        if(animating) return
        if(pageName === currentPageName) return

        // Set animating
        setAnimating(true)
        
        await new Promise(r => setTimeout(r, 100))
        
        // Animate all pages out
        pages.forEach(element => {
            if(element.page.current.scale.x > 0)
            {
                element.page.current.toggleAnimateOut()
            }
        });
            
        // wait for animation to finish
        await new Promise(r => setTimeout(r, 500))

        // Set the current page
        setCurrentPageName(pageName)

        // Animate new page in
        if(pageName === 'home' && home.current.scale.x === 0) home.current.toggleAnimateOut()
        if(pageName === 'projects' && projects.current.scale.x === 0) projects.current.toggleAnimateOut()

        // Set animating
        setAnimating(false)
    }

    return <>
        {/* Loading screen */}
        <mesh position={ [-1.50, 0, 4.08] } rotation-y={ -0.5 } ref={loadingPlane} visible={loading}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial color='#2d3137' opacity={loadPlaneOp} transparent />
        </mesh>

        {/* NavBar */}
        <Html center position={ [0,2.4,0] } style={{ display: 'flex', justifyContent: 'center', gap: '10px', padding: '10px', fontFamily: 'Anek Bangla, sans-serif' }}>
            <a 
                onClick={() => SetPage('home')}
                style={{ padding: '10px', color: currentPageName === 'home' ? '#87ceeb' : 'white', textDecoration: 'none' }}
            >
                HOME
            </a>
            <a 
                onClick={() => SetPage('projects')} 
                style={{ padding: '10px', color: currentPageName === 'projects' ? '#87ceeb' : 'white', textDecoration: 'none' }}
            >
                PROJECTS
            </a>
            <a 
                onClick={() => SetPage('contact')}  
                style={{ padding: '10px', color: currentPageName === 'contact' ? '#87ceeb' : 'white', textDecoration: 'none' }}
            >
                CONTACT
            </a>
        </Html>

        {/* Controls reflections and lighting */}
        <Environment preset='city' />

        {/* Background color */}
        <fog attach="fog" args={['#2d3137', 10, 20]} />

        {/* Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
            <planeGeometry args={[50, 50]} />
            <meshStandardMaterial color="#2d3137" />
        </mesh>

        {/* Wall for fog */}
        <mesh rotation={[0, -Math.PI * 0.25, 0]} position={[10, -1.5, -30]}>
            <planeGeometry args={[100, 30]} />
            <meshBasicMaterial color="#2d3137" />
        </mesh>

        {/* Allows the user to control the camera, with limits */}
        <PresentationControls 
            global
            // Global rotation
            rotation={ [0.13, 0.1, 0] }
            // Amount of vertical rotation
            polar={ [-0.4, 0.2] }
            // Amt Horizontal rotation
            azimuth={ [-1, 0.75] }

            // Animation for dragging
            config={ { mass: 2, tension: 400 } }

            // animation to snap back on release
            snap={ {mass: 4, tension: 400} }
        >

            {/* Make the scene float */}
            <Float rotationIntensity={ 0.4 }>

                {/* SCENES */}
                <LaptopScene ref={home} />

                <ProjectsScene ref={projects} />

            </Float>


            
        </PresentationControls>


        {/* Shadow */}
        <ContactShadows 
            position-y={ -1.4 }
            opacity={ 0.4 }
            scale={ 10 }
            blur={ 2.4 }
        />
    </>
}