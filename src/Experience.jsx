import { Text, Html, Environment, Float, ContactShadows, PresentationControls, useGLTF } from '@react-three/drei'


/**
 * 
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
        <color args={ [ '#3b3b3b' ]} attach="background" />

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
                    color={ '#537faa' }
                    rotation={ [ - 0.1, Math.PI, 0 ] }
                    position={ [ 0, 0.55, - 1.15 ] }
                />
                {/* Laptop Model */}
                <primitive 
                    object={ computer.scene } 
                    position-y={ - 1.2 } 
                >
                    {/* My Website html within laptop model so they're grouped */}
                    <Html transform 
                        wrapperClass="htmlScreen" 
                        distanceFactor={1.17} 
                        position={ [0, 1.56, -1.4] } 
                        rotation-x={-0.256}
                    > 
                        <iframe src="https://eliparker.dev/react-site/" /> 
                    </Html>
                </primitive>

                {/* Text */}
                <Text
                    font='./narnoor-v7-latin-regular.woff'
                    fontSize={ 1 }
                    position={ [ 2.5, 0.75, -0.3 ] }
                    rotation-y={ - 1.25 }
                    maxWidth={ 2 }
                    lineHeight={ 1 }
                >
                    Eli Parker
                </Text>

            </Float>
        </PresentationControls>

        {/* Shadow */}
        <ContactShadows 
            position-y={ -1.4 }
            opacity={ 0.4 }
            scale={ 5 }
            blur={ 2.4 }
        />
    </>
}