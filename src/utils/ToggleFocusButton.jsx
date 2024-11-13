import React, { useState } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import gsap from 'gsap';
import { Text } from '@react-three/drei';

/**
 * Generates a button that allows the user to toggle between two views
 * @param {string} page - the page this button is on (used to determine the camera position)
 */
export default function ToggleFocusButton({page, ...props })
{
    // Get camera object
    const { camera } = useThree();

    // Store initial positions and rotations
    const [initialPosition] = useState(() => camera.position.clone());
    const [initialRotation] = useState(() => camera.rotation.clone());

    // State for focus, to tell when the camera is zoomed in
    const [focus, setFocus] = useState(false);

    // Get the button object for animation
    const Button = React.useRef();

    // Initialize the isAnimating property
    const [isAnimating, setIsAnimating] = React.useState(false);

    // Rotate the button
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        Button.current.rotation.x = a;
        Button.current.rotation.y = a;
      });

    /**
     * Function to move the camera closer to/away from the laptop
     */
    function ToggleMoveLaptop() 
    {
        // Prevent multiple calls until animation finishes
        if (isAnimating)  return;

        setIsAnimating(true);
        
        // Define the target positions and rotations
        const focusPosition = page === "projects" ? new THREE.Vector3(0, 1, 3) : new THREE.Vector3(0, 1, 2);
        const focusRotation = page === "projects" ? new THREE.Euler(-0.1, 0, 0.0) : new THREE.Euler(-0.1, 0.05, 0); 
        
        // Determine which position and rotation to move to based on whether were focused
        const targetPosition = focus ? initialPosition : focusPosition;
        const targetRotation = focus ? initialRotation : focusRotation;
        
        // Use GSAP to animate the camera position
        gsap.to(camera.position, {
            duration: 1,
            x: targetPosition.x,
            y: targetPosition.y,
            z: targetPosition.z,
            ease: "power2.inOut",
            onUpdate: () => {
                camera.updateProjectionMatrix();
            },
            onComplete: () => {
                setIsAnimating(false);
            }
        });
        
        gsap.to(camera.rotation, {
            duration: 1,
            x: targetRotation.x,
            y: targetRotation.y,
            z: targetRotation.z,
            ease: "power2.inOut",
            onUpdate: () => {
                camera.updateProjectionMatrix();
            },
            onComplete: () => {
                setIsAnimating(false);
            }
        });

        setFocus(!focus);
    }
    
    // Return value
    return (
        <group {...props}>
            <mesh
                ref={Button}
                onClick={() => {
                    // Logic to move closer to/away from the laptop
                    ToggleMoveLaptop();
                }}
            >
                <icosahedronGeometry args={ [0.2, 0] }/>
                <meshNormalMaterial />
            </mesh>
            {/* Text */}
            <Text
                font="./fonts/anek-bangla-v5-latin-500.woff"
                fontSize={0.1}
                position={[0, 0.25, 0]}
                maxWidth={2}
                lineHeight={1}
                color="#87ceeb"
            >
               ⌄ Click to Focus ⌄
            </Text>
        </group>
    );
}