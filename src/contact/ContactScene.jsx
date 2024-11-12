import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
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
    }, { collapsed: true });

    /*
     * Point light
    */

    // Ref for the point light
    const pointLightRef = useRef();
    
    /* 
     * Logos
    */ 

    // Github logo
    const githubLogo = useRef();

    // LinkedIn logo
    const linkedinLogo = useRef();

    // Email logo
    const emailLogo = useRef();

    // State for focusing the logo
    const [focusedLogo, setFocusedLogo] = useState('none');

    // Change animations when logo is focused
    useEffect(() => {
        switch (focusedLogo) {

        case 'none':
            animateOut([linkedinLogo, emailLogo, githubLogo]);

            // Reset the light
            gsap.to(pointLightRef.current.color, {
                duration: 0.3,
                r: 50,
                g: 50,
                b: 50,
                ease: "power4.inOut",
            });
            break;

        case 'linkedin':
            animateOut([emailLogo, githubLogo]);
            animateIn([linkedinLogo]);

            // Change the light color
            gsap.to(pointLightRef.current.color, {
                duration: 0.3,
                r: 5,
                g: 10,
                b: 100,
                ease: "power4.inOut",
            });
            break;

        case 'github':
            animateOut([emailLogo, linkedinLogo]);
            animateIn([githubLogo]);

            // Change the light color
            gsap.to(pointLightRef.current.color, {
                duration: 0.3,
                r: 54,
                g: 1,
                b: 63,
                ease: "power4.inOut",
            });
            break;
        case 'email':
            animateOut([linkedinLogo, githubLogo]);
            animateIn([emailLogo]);

            // Change the light color
            gsap.to(pointLightRef.current.color, {
                duration: 0.3,
                r: 50,
                g: 2,
                b: 4,
                ease: "power4.inOut",
            });
            default:
            break;
        }
        

    }, [focusedLogo])

    // State for recent click (to prevent users from spamming the link)
    const [recentClick, setRecentClick] = useState(false);


    // Return value (here for legibiity) ****************************************************
    return (
    <group ref={scene} position={ [sp_x,sp_y,sp_z] } rotation={ [sr_x,sr_y,sr_z] } > 

        {/* Pedestals */}
        <group position={ [ped_x,ped_y,ped_z] } rotation={ [pedr_x, pedr_y, pedr_z] } scale={0.1}>
            <Pedestal position={[0,0,-20]} />
            <Pedestal />
            <Pedestal position={[0,0,20]} />
        </group>

        {/* Logos arranged from left to right */}
        {/* linkedIn logo */}
        <Logo 
            ref={linkedinLogo} 
            kind={'linkedin'} 
            position={ [-0.1, 0.9, -2] }
            onClick={() => handleClick('https://www.linkedin.com/in/eli-parker-a96338302/', recentClick, setRecentClick)}
            onPointerEnter={() => setFocusedLogo('linkedin')}
            onPointerLeave={() => setFocusedLogo('none')}

        />
        {/* Email Logo */}
        <Logo 
            ref={emailLogo}
            kind={'email'}
            position={ [-0.1, 0.9, 0] }
            onClick={() => handleClick('mailto:eliparkdev@icloud.com', recentClick, setRecentClick)}
            onPointerEnter={() => setFocusedLogo('email')}
            onPointerLeave={() => setFocusedLogo('none')}
        />
        {/* Github logo */}
        <Logo 
            ref={githubLogo}
            kind={'github'}
            position={ [-0.1, 0.9,  2] }
            onClick={() => handleClick('https://github.com/eli-parker/', recentClick, setRecentClick)}
            onPointerEnter={() => setFocusedLogo('github')}
            onPointerLeave={() => setFocusedLogo('none')}
        />

        {/* Get In Touch Text */}
        <TitleText3D 
            title="Get In Touch"
            position={[txt_x, txt_y, txt_z]}
            scale={5}
            rotation={ [0,-Math.PI /2, 0] }
            useStandard 
        />

        {/* Light */}
        <pointLight 
            ref={pointLightRef}
            color={'#ffffff'}
            position={[-1, 1.5, 0]}
            intensity={0.5}
            distance={4}
            decay={0.9}
        />

    </group>)
        
})



export default ContactScene;


// Helper functions ****

/**
 * Animates the scale of the given references to create an "in" effect.
 * 
 * @param {Array} refs - An array of references to the elements to animate.
 * @returns {Promise<void>} A promise that resolves when all animations are complete. 
 * Here make sure other animations are complete before resolving.
 */
async function animateIn(refs) {
    const animations = refs.map(ref => 
        gsap.to(ref.current.scale, {
            duration: 0.3,
            x: 1.2,
            y: 1.2,
            z: 1.2,
            ease: "elastic.out(1,0.5)",
        })
    );
    await Promise.all(animations);
}

/**
 * Animates the scale of the given references to create an "out" effect.
 * 
 * @param {Array} refs - An array of references to the elements to animate.
 * @returns {Promise<void>} A promise that resolves when all animations are complete.
 * Here make sure other animations are complete before resolving.
 */
async function animateOut(refs) {
    const animations = refs.map(ref => 
        gsap.to(ref.current.scale, {
            duration: 0.3,
            x: 1,
            y: 1,
            z: 1,
            ease: "elastic.out(1,0.5)",
        })
    );
    await Promise.all(animations);
}

/**
 * Handles the click event for opening a site in a new tab.
 * Prevents spamming the same site by introducing a delay between clicks.
 * 
 * @param {string} site - The URL of the site to open.
 * @param {boolean} recentClick - The state indicating if a recent click has occurred.
 * @param {Function} setRecentClick - The function to set the recent click state.
 */
async function handleClick(site, recentClick, setRecentClick)
{
    // stop from spamming the same site
    if(recentClick) return;
    
    // Set the recent click
    setRecentClick(true);

    // Open the site in a new tab
    window.open(site, "_blank");

    // wait one quarter second before allowing another click
    await new Promise(r => setTimeout(r, 250));

    setRecentClick(false);
}


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