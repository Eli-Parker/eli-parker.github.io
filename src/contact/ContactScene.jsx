import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import TitleText3D from "../projects/TitleText3d";
import { useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";
import Pedestal from "./Pedestal";
import Logo from "./Logo";
import gsap from "gsap";


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

    // Leva controls
    const {
        sp_x, sp_y, sp_z,
        sr_x, sr_y, sr_z,
        ped_x, ped_y, ped_z,
        pedr_x, pedr_y, pedr_z,
        txt_x, txt_y, txt_z,
    } = useControls('Contact Scene',{
        'Scene Position': folder({sp_x: 0.00, sp_y:  0.00, sp_z:  -0.20 }, {collapsed: true}),

        'Scene rotation': folder({sr_x: -0.11, sr_y: 1.00, sr_z: 0 }, {collapsed: true}),

        'Pedestals Position': folder({ped_x: 0, ped_y: -0.8, ped_z: 0.01 }, {collapsed: true}),

        'Pedestals Rotation': folder({pedr_x: 0.00, pedr_y: 0.01, pedr_z: 0 }, {collapsed: true}),

        'Title Text Position': folder({txt_x: 1.38, txt_y: 1.6, txt_z: -0.01 }, {collapsed: true}),

        'Point Light color': {value: '#ffffff', onChange: (v) => {setPlColor(v)} },
    })

    /*
     * Point light
    */

    // Store point light color
    const [plColor, setPlColor] = useState('#ffffff');


    // Return value (here for legibiity) ****************************************************
    return (
    <group ref={scene} position={ [sp_x,sp_y,sp_z] } rotation={ [sr_x,sr_y,sr_z] } > 

        {/* Pedestals */}
        <group position={ [ped_x,ped_y,ped_z] } rotation={ [pedr_x, pedr_y, pedr_z] } scale={0.1}>
            <Pedestal position={[0,0,-20]} />
            <Pedestal  />
            <Pedestal position={[0,0,20]} />
        </group>

        <Logo kind={'github'}   position={ [-0.1, 0.9,  2] }/>
        <Logo kind={'linkedin'} position={ [-0.1, 0.9, -2] }/>

        {/* Get In Touch Text */}
        <TitleText3D title="Get In Touch" position={[txt_x, txt_y, txt_z]} scale={5} rotation={ [0,-Math.PI /2, 0] } useStandard />

        <pointLight color={plColor} position={[-1, 1.5, 0]} intensity={10} distance={4} decay={0.9} />

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
    const animatedIn = scene.current.scale.x === 1;

    // Toggle scale
    const targetScale = animatedIn ? { x: 0, y: 0, z:0 } : { x: 1, y: 1, z:1 };

    // Animate out if the scene is already animated in
    if(animatedIn)
    {
        gsap.to(scene.current.scale, {
            duration: 0.5,
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
            duration: 0.5,
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