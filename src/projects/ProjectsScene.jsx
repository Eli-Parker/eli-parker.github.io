import { useGLTF, Text, Html } from "@react-three/drei"
import {  forwardRef, useImperativeHandle, useRef, useState } from "react"
import gsap from "gsap"
import { useThree } from "@react-three/fiber"

/**
 * Contains the Laptop scene used in the homepage.
 * @param {Object} props - The properties object.
 * @param {React.Ref} ref - The ref to be forwarded.
 * @returns {JSX.Element} Laptop scene component.
 */
const ProjectsScene = forwardRef(({}, ref ) => {

    // Font Reference
    const font = "./fonts/anek-bangla-v5-latin-500.woff"

    // Grab projects json from site reference
    const projects = getProjects();

    /**
     *  Fetches the projects json from my boring 2d site.
     * @returns the projects json from the site
     */
    async function getProjects() 
    {
        try 
        {
          let response = await fetch('https://eliparker.dev/react-site/projects.json');
          let responseJson = await response.json();
          return responseJson;
        } 
        catch(error) 
        {
          console.error(error);
        }
    }

    // State of properties
    const [isAnimating, setIsAnimating] = useState(false);

    // Scene reference
    const scene = useRef();
    const { camera } = useThree();

    // Forwarding the ref
    useImperativeHandle(ref, () => (
    {
        // Toggle the animation
        toggleAnimateOut: () => 
        {
            // stop animation from being called multiple times
            if(! isAnimating) 
            {
                // Set the state to animating
                setIsAnimating(true);

                // Toggle visibility
                scene.current.visible = true

                // Toggle scale
                const targetScale = scene.current.scale.x === 1 ? { x: 0, y: 0, z:0 } : { x: 1, y: 1, z:1 };

                // Animate the scale
                gsap.to(scene.current.scale, {
                    duration: 0.5,
                    x: targetScale.x,
                    y: targetScale.y,
                    z: targetScale.z,
                    ease: "power2.inOut",
                    onUpdate: () => {
                        camera.updateProjectionMatrix();
                    },
                    // Hide the scene when the animation is complete
                    onComplete: () => {
                        if (targetScale.x === 0){
                            scene.current.visible = false;
                        }
                        setIsAnimating(false);
                    }
                });
            }
        }
    }))


    return (
    <group ref={scene} scale={0} visible={false}> {/* Hidden by default */}
        <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
        </mesh>
    </group>
    )
})

export default ProjectsScene