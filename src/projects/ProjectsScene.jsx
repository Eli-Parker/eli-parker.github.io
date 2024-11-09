import { Center, Environment, GradientTexture, GradientType, MeshPortalMaterial, Text, Text3D, useGLTF} from "@react-three/drei"
import React, {  forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import gsap from "gsap"
import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { folder, useControls } from "leva"
import * as THREE from "three"
import DescriptionText3D from "./DescriptionText3D"

/**
 * Contains the Laptop scene used in the homepage.
 * @param {Object} props - The properties object.
 * @param {React.Ref} ref - The ref to be forwarded.
 * @returns {JSX.Element} Laptop scene component.
 */
const ProjectsScene = forwardRef((props, ref ) => {


    /*
     * Imports 
    */

    // Font Reference
    const font = "/fonts/anek-bangla-v5-latin-600.woff"
    
    // Load 3d text matcap
    const [textMatcap] = useLoader(THREE.TextureLoader, ['/matcaps/green3.png'])

    // Computer model
    const monitorModel = useGLTF(`/models/computer_monitor_lowpoly/monitor.glb`);

    // Icon Models
    const githubModel = useGLTF('/models/socialMediaIcons/github.glb')
    const siteModel = useGLTF('/models/socialMediaIcons/website-icon/source/website.glb')

    // Box model
    const { nodes } = useGLTF('/aobox-transformed.glb')



    // Grab projects json from site reference
    const [projects, setProjects] = useState([]);

    // When prog starts, get projects json and set it to projects var above
    useEffect(() => {
        getProjects().then(projects => setProjects(projects));
    }, []);

    /**
     * Fetches the projects json from my boring 2d site.
     * @returns the projects json from the site
     */
    async function getProjects() 
    {
        try 
        {
          let response = await fetch('https://eliparker.dev/react-site/projects.json');
          let responseJson = await response.json();
          return responseJson.projects;
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

    // Reference to logos
    const githubLogoRef = useRef();
    const siteLogoRef = useRef();

    // Animate logos
    useFrame((state) => {
        // Animate only if the scene is visible
        if (scene.current.visible) 
        {
            // Animate the logos if they exist
            if (githubLogoRef.current) {
            githubLogoRef.current.position.y = (0.01 * Math.sin(state.clock.getElapsedTime() * 1.4)) - 0.65; // Adjust the rotation speed as needed
            }
            if (siteLogoRef.current) {
            siteLogoRef.current.position.y = (0.01 * Math.cos(state.clock.getElapsedTime() * 1.4)) - 0.35; // Adjust the rotation speed as needed
            }
        }
    });

    // Forwarding the ref, used to trigger animations in experience.jsx
    useImperativeHandle(ref, () => (
    {
        // Used to tell whether the scene is hidden or not
        scale: scene.current.scale,

        // Toggle the animation
        toggleAnimateOut: () => 
        { 
            toggleAnimation(scene, camera, isAnimating, setIsAnimating);
        },

        /**  Toggle without the animation*/
        toggleOut: () => 
        { 
            ToggleNoAnimation(scene, isAnimating, setIsAnimating);
        }
    }))

    /*
     * Leva controls
    */
    const {
        sr_x, sr_y, sr_z,
        MonitorX, MonitorY, scale,
        portalX, portalY, portalZ, portalScale,
        projectNumber
    } = useControls('Projects Scene', {
        'Scene rotation': folder({
            sr_x: -0.195,
            sr_y: -0.5547,
            sr_z: -0.0698,
        }, {collapsed: true}),

        'Monitor Ctrls': folder(
        {
            MonitorX:
            {
                value: 0,
                step: 0.01,
            },
            MonitorY:
            {
                value: -0.28,
                step: 0.01,
            },
            scale:
            {
                value: 0.50,
                step: 0.01,
            },
        }, {collapsed: true}),

        'Portal Ctrls': folder(
        {
            portalX: {
                value: 0,
                step: 0.01,
            },
            portalY: {
                value: 1.45,
                step: 0.01,
            },
            portalZ: {
                value: -0.22,
                step: 0.001,
            },
            portalScale: {
                value: 1.89,
                step: 0.01,
            },
        }, {collapsed: true,}),
        projectNumber: 
        {
            value: 3,
            min: 1,
            max: 6,
            step: 1,
        }
    }, {collapsed: true});

    // Site and Github positions, here to center the icon if the other icon doesn't exist
    const [githubPositionX, setGithubPositionX] = useState(-0.3);
    const [sitePositionX, setSitePositionX] = useState(0.3);

    // UseEffect to update the positions of the logos whenever they change
    useEffect(() => {
        console.log('The project logo positions have been updated')

        // Update positions based on the presence of the other model
        if (githubLogoRef.current && siteLogoRef.current) {
            setGithubPositionX(-0.3);
            setSitePositionX(0.3);
        } else if (githubLogoRef.current) {
            setGithubPositionX(0);
        } else if (siteLogoRef.current) {
            setSitePositionX(0);
        }

        // If neither are here do nothing, positions of objects that don't exist are already set to 0
    }, [githubLogoRef.current, siteLogoRef.current]);

    // START OF RETURN (here for legibility) ***************************************************
    return (
    <group key={'FullProjectScene'} ref={scene} scale={2} visible={true} rotation={ [sr_x, sr_y, sr_z] }>

        {projects && Object.values(projects).map((project, index) => {
            if(project.id == projectNumber){
            return (
                <React.Fragment key={`${project.name}-${index}`}>

                {/* Monitor model */}
                <primitive key={`${project.name}-monitor ${index}`} object={monitorModel.scene} position={ [MonitorX,MonitorY,0] } scale={scale} textAlign="center">
                    {/* Monitor Portal */}
                    <mesh key={`${project.name}-monitorPortal`} position={ [portalX,portalY,portalZ] } scale={portalScale}>
                        <planeGeometry key={`${project.name}-monitorPortalPlane`} args={[2, 1]} />
                        <MeshPortalMaterial key={`${project.name}-monitorPortalMat`} >
                            <ambientLight intensity={0.5} key={`${project.name}-monitorPortalAmbLi`} />
                            <Environment preset="city" key={`${project.name}-monitorPortalEnv`} />

                            {/** A box with baked AO */}
                            <mesh castShadow receiveShadow rotation-y={ -Math.PI * 0.5 } geometry={nodes.Cube.geometry} scale-y={0.5} scale-x={0.5} key={`${project.name}-innerBox`}>
                                <meshStandardMaterial color={'#2E6F40'} key={`${project.name}-innerBoxMat`}/>
                                <spotLight castShadow color={'#bee3ba'} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} key={`${project.name}-innerBoxSpotLight`} />
                            </mesh>

                            {/* Bounding box to contain centered text. Text will center on the location of the cube */}
                            <mesh key={`${project.name}-CenteringBoxGeom`} position={ [0, 0.35, -0.1] }>
                                <boxGeometry args={[0.1,0.1,0.1]} key={`${project.name}-CenteringBoxGeom`} />
                                <meshBasicMaterial color={'#FFFFFF'} key={`${project.name}-CenteringBoxMat`} visible={false} />
                                {/* Centered Text within box */}
                                <Center key={`${project.name}-TitleCenter`}>
                                    <Text3D
                                        scale={ 0.1 }
                                        key={`${project.name}-Textddd`}
                                        curveSegments={32}
                                        bevelEnabled
                                        bevelSize={0.04}
                                        bevelThickness={0.1}
                                        height={0.5}
                                        lineHeight={0.5}
                                        letterSpacing={-0.06}
                                        size={1}
                                        font="/fonts/Inter_Bold.json"
                                    >
                                        {project.name}
                                    <meshMatcapMaterial matcap={textMatcap} />
                                    </Text3D>
                                </Center>
                            </mesh>

                            {/* Description 3D Text */}
                            <DescriptionText3D position-z={-0.15} >{project.description}</DescriptionText3D>

                            {/* GitHub reference link (only appears if there's a reference) */}
                            <primitive ref={githubLogoRef}
                                object={githubModel.scene} 
                                onClick={() => window.open(project.github === "" ? 'https://eliparker.dev/' : project.github, "_blank")}
                                position={[githubPositionX, -0.65, -0.8]} 
                                scale={0.1} 
                                key={`githubRef${index}`}
                                visible={project.github !== "" }
                            />

                            {/* Site reference link (only appears if there's a reference) */}
                            <primitive ref={siteLogoRef}
                                object={siteModel.scene.children[0]} 
                                onClick={() => window.open(project.siteReference === "" ? 'https://eliparker.dev/' : project.siteReference, "_blank")}
                                position={[sitePositionX, -0.4, -0.215]} 
                                rotation={[Math.PI / 2, 0, 0]}
                                scale={0.01} 
                                key={`siteref${index}`}
                                visible={project.siteReference !== ""}
                            />
                            
                        </MeshPortalMaterial>
                    </mesh>
                </primitive>

            </React.Fragment>
            );}
        })}
    </group>
    )
})

export default ProjectsScene


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
    if(isAnimating) 
    {
        return;
    }

    // Set the state to animating
    setIsAnimating(true);

    // Toggle visibility
    scene.current.visible = true

    // Toggle scale
    const targetScale = scene.current.scale.x === 2 ? { x: 0, y: 0, z:0 } : { x: 2, y: 2, z:2 };

    // Target rotation
    const targetRotation = scene.current.scale.x === 2 ? ((Math.PI) - 0.5547) : -0.5547;

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

    // Animate the rotation
    gsap.to(scene.current.rotation, {
        duration: 0.5,
        y: targetRotation,
        ease: "power2.inOut",
        onUpdate: () => {
            camera.updateProjectionMatrix();
        },
        onComplete: () => {
            setIsAnimating(false);
        }
    });
}

/**
 * Toggles the scene without the animation.
 * @param {Object} scene the scene to toggle
* @param {boolean} isAnimating The state of the animation
 * @param {Function} setIsAnimating to set the state of the animation
 */
function ToggleNoAnimation(scene, isAnimating, setIsAnimating)
{
    // stop animation from being called multiple times
    if(isAnimating) 
    { 
        return;
    }

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
        scene.current.scale.x = 2;
        scene.current.scale.y = 2;
        scene.current.scale.z = 2;
    }

    // Set the state to not animating
    setIsAnimating(false);
}