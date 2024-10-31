import React from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from 'three';
import gsap from 'gsap';
import { Text } from '@react-three/drei';

/**
 * Generates a button that allows the user to toggle between two views
 */
export default function ToggleViewButton({ position }) 
{
    // Get camera object
    const { camera } = useThree();

    // Get the button object for animation
    const Button = React.useRef();

    // Initialize the isAnimating property
    ToggleMoveLaptop.isAnimating = false;

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
        if (ToggleMoveLaptop.isAnimating)
        {
            return;
        }
        else
        {
            ToggleMoveLaptop.isAnimating = true;
        }

        // Get the current position and rotation of the camera
        const currentPosition = camera.position;
        const currentRotation = camera.rotation;

        // Define the target positions and rotations
        const targetPosition1 = new THREE.Vector3(-3, 1.5, 6);
        const targetRotation1 = new THREE.Euler(-0.1, 0.05, 0);

        const targetPosition2 = new THREE.Vector3(0, 1, 2);
        const targetRotation2 = new THREE.Euler( -0.24, -0.45, -0.11); 

        // Determine which position and rotation to move to
        const targetPosition = currentPosition.equals(targetPosition1) ? targetPosition2 : targetPosition1;
        const targetRotation = currentRotation.equals(targetRotation1) ? targetRotation2 : targetRotation1;

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
                ToggleMoveLaptop.isAnimating = false;
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
                ToggleMoveLaptop.isAnimating = false;
            }
        });
    }
    
    // Return value
    return (
        <>
            <mesh
                position={position}
                ref={Button}
                onClick={() => {
                    // Logic to move closer to/away from the laptop
                    ToggleMoveLaptop();
                }}
            >
                <icosahedronGeometry args={ [0.2, 0] }/>
                <meshNormalMaterial />
                {/* <meshStandardMaterial color="#87ceeb" /> */}
            </mesh>
            {/* Text */}
            <Text
                font="./fonts/anek-bangla-v5-latin-500.woff"
                fontSize={0.1}
                position={[position[0], position[1] + 0.25, position[2]]}
                maxWidth={2}
                lineHeight={1}
                color="#87ceeb"
            >
               ⌄ Click to Focus ⌄
            </Text>
        </>
    );
}