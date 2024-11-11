import { useThree } from "@react-three/fiber";
import gsap from "gsap";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";


const ContactScene = forwardRef((_props, ref ) => {

    // State for animation
    const scene = useRef();
    const [isAnimating, setIsAnimating] = useState(false);

    // Grab camera from useThree for gsap animation
    const { camera } = useThree();

    // Forwarding the ref, used to trigger animations in experience.jsx
    useImperativeHandle(ref, () => (
    {
        // Used to tell whether the scene is hidden or not
        scale: scene.current.scale,

        /** Toggle the in/out animation */
        toggleAnimateOut: () => 
        { 
            toggleAnimation(scene, camera, isAnimating, setIsAnimating);
        },

        /**  Toggle scene vis without the animation*/
        toggleOut: () => 
        { 
            ToggleNoAnimation(scene, isAnimating, setIsAnimating);
        }
    }))

    // Return value (here for legibiity) ****************************************************
    return (
    <group ref={scene} > 
        <mesh >
            <boxGeometry args={ [1, 1, 1] } />
            <meshNormalMaterial />
        </mesh>
    </group>)
        
})



export default ContactScene;


/**
 * Toggles the animation in and out for the scene.
 * @param {Object} scene The scene to animate
 * @param {THREE.Camera} camera the scene camera, used in GSAP animations
 * @param {boolean} isAnimating The state of the animation
 * @param {Function} setIsAnimating The function to set the state of the animation
 */
function toggleAnimation(scene, camera, isAnimating, setIsAnimating) 
{
    // stop animation from being called multiple times
    if(isAnimating) return;

    // Set the state to animating
    setIsAnimating(true);

    // Toggle visibility
    scene.current.visible = true

    // True if the scene is already animated in, meaning we want to animate out
    const animatedIn = scene.current.scale.x > 0;

    // Toggle scale
    const targetScale = animatedIn ? { x: 0, y: 0, z:0 } : { x: 1, y: 1, z:1 };

    // Animate out if the scene is already animated in
    if(animatedIn)
    {
        gsap.to(scene.current.scale, {
            duration: 0.7,
            x: targetScale.x,
            y: targetScale.y,
            z: targetScale.z,
            ease: "elastic.out(1,1)",
            onUpdate: () => 
            {
                camera.updateProjectionMatrix();
            },
            // Hide the scene when the animation is complete
            onComplete: () => 
            {
                if (targetScale.x === 0){
                    scene.current.visible = false;
                }
                setIsAnimating(false);
            }
        });
    }
    else
    {
        gsap.to(scene.current.scale, {
            duration: 0.75,
            x: targetScale.x,
            y: targetScale.y,
            z: targetScale.z,
            ease: "elastic.out(1,0.5)",
            onUpdate: () => 
            {
                camera.updateProjectionMatrix();
            },
            // Hide the scene when the animation is complete
            onComplete: () => 
            {
                if (targetScale.x === 0){
                    scene.current.visible = false;
                }
                setIsAnimating(false);
            }
        });
    }
}

/**
 * Toggles the scene without the animation.
 * @param {Object} scene the scene to toggle
* @param {boolean} isAnimating The state of the animation
 * @param {Function} setIsAnimating Function to set the state of the animation
 */
function ToggleNoAnimation(scene, isAnimating, setIsAnimating)
{
    // stop animation from being called multiple times
    if(isAnimating) return;

    // Set the state to animating
    setIsAnimating(true);

    // Toggle visibility
    scene.current.visible = true

    // Toggle scale
    if(scene.current.scale.x > 0)
    {
        scene.current.scale.x = 0;
        scene.current.scale.y = 0;
        scene.current.scale.z = 0;

        // If the scale is 0, hide the scene
        scene.current.visible = false
    }
    else
    {
        scene.current.scale.x = 1;
        scene.current.scale.y = 1;
        scene.current.scale.z = 1;
    }

    // Set the state to not animating
    setIsAnimating(false);
}