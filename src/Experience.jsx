import { Text, Html, Environment, Float, ContactShadows, PresentationControls, useGLTF, Stars } from '@react-three/drei'
import ToggleViewButton from './ToggleViewButton'
import MagicBox from './MagicBox'
/**
 * Contains the full R3F experience
 * @returns the R3F experience
 */
export default function Experience()
{
    // Computer model
    const computer = useGLTF('https://threejs-journey.com/resources/models/macbook_model.gltf')
    
    return <>

        {/* Controls reflections and lighting */}
        <Environment preset='city' />

        {/* Background color */}
        <color args={ [ '#2d3137' ]} attach="background" />

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

                {/* Screen Light */}
                <rectAreaLight
                    width={ 2.5 }
                    height={ 1.65 }
                    intensity={ 65 }
                    color={ '#2d5793' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />

                {/* Laptop Model */}
                <primitive 
                    object={ computer.scene } 
                    position-y={ - 1.2 } 
                >
                    {/* My React Website within laptop model so they're grouped */}
                    <Html transform 
                        wrapperClass="htmlScreen" 
                        distanceFactor={1.17} 
                        position={ [0, 1.56, -1.4] } 
                        rotation-x={-0.256}
                        occlude="blending"
                    > 
                        <iframe src="https://eliparker.dev/react-site/"/> 
                    </Html>
                </primitive>

                {/* Big Name Text */}
                <Text
                    font='./asimovxwid.woff'
                    fontSize={ 0.75 }
                    position={ [ 2.5, 0.5, -0.3 ] }
                    rotation-y={ - 1 }
                    rotation-z={ 0.1 }
                    maxWidth={ 2 }
                    lineHeight={ 1 }
                    color="#87ceeb"
                >
                    Eli Parker
                </Text>

                {/* Tooltip Text */}
                <Text
                    font='./asimovxwid.woff'
                    fontSize={ 0.125 }
                    position={ [ -2, 0.75, -1.25 ] }
                    rotation={ [-0,-0.1,0] }
                    maxWidth={ 2 }
                    lineHeight={ 1 }
                    color="#87ceeb"
                >
                    Scroll me! →
                </Text>

                {/* Button to move closer to/away from the laptop */}
                <ToggleViewButton position={ [0,1.6,-1.8] } />

                {/* Magic box display */}
                <MagicBox position={[2.8,1.05,0]} rotation={ [-0.1,1,0] }/>

            </Float>


            
        </PresentationControls>

        {/* Stars */}
        <Stars radius={30} depth={50} count={5000} factor={4} saturation={0} fade speed={1}  />

        {/* Floor to cover stars, make Illusion of actual floor */}
        <mesh rotation-x={ -Math.PI / 2} position={[10,-10,-20]} scale={ [ 20, 20, 50]}>
            <planeGeometry />
            <meshStandardMaterial color="#2d3137" transparent opacity={0}/>
        </mesh>


        {/* Shadow */}
        <ContactShadows 
            position-y={ -1.4 }
            opacity={ 0.4 }
            scale={ 10 }
            blur={ 2.4 }
            // Only render once
            frames={ 1 }
        />
    </>
}