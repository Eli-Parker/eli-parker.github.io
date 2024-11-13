import React from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import { Group } from 'three';
import gsap from 'gsap';
import { Text } from '@react-three/drei';

/**
 * Generates a button that allows the user to toggle between two views
 * in the project window
 */
export default function ToggleProjectFocusButton({ ...props }) 
{
    // Get camera object
    const { camera } = useThree();

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
     * Moves the camera closer to/away from the main focus of the scene.
     */
    function ToggleFocusScene() 
    {
        // Prevent multiple calls until animation finishes
        if (isAnimating)  return;


        setIsAnimating(true);
        
        // Get the current position and rotation of the camera
        const currentPosition = camera.position;
        const currentRotation = camera.rotation;
        
        // Define the target positions and rotations
        const homePosition = new THREE.Vector3(-3, 1.5, 6);
        const homeRotation = new THREE.Euler(-0.1, 0.05, 0);
        
        const focusPosition = new THREE.Vector3(-3, 1.5, 6);
        const focusRotation = new THREE.Euler( -0.24, -0.45, -0.11); 
        
        // Determine which position and rotation to move to
        const targetPosition = currentPosition.equals(homePosition) ? focusPosition : homePosition;
        const targetRotation = currentRotation.equals(homeRotation) ? focusRotation : homeRotation;
        
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
    }
    
    // Return value (in a group to preserve relative positions between elements)
    return (
        <Group {...props}>
            <mesh
                ref={Button}
                onClick={() => {
                    // Logic to move closer to/away from the focal point of the scene
                    ToggleFocusScene();
                }}
            >
                <icosahedronGeometry args={ [0.2, 0] }/>
                <meshNormalMaterial />
            </mesh>
            {/* Text */}
            <Text
                font="./fonts/anek-bangla-v5-latin-500.woff"
                fontSize={0.1}
                position={ [0, -0.25, 0] }
                maxWidth={2}
                lineHeight={1}
                color="#87ceeb"
            >
               ⌃ Click to Focus ⌃
            </Text>
        </Group>
    );
}