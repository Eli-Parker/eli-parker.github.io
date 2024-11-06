import { Environment, Html, MeshPortalMaterial, Text, useGLTF} from "@react-three/drei"
import {  forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import gsap from "gsap"
import { useFrame, useThree } from "@react-three/fiber"
import { folder, useControls } from "leva"

/**
 * Contains the Laptop scene used in the homepage.
 * @param {Object} props - The properties object.
 * @param {React.Ref} ref - The ref to be forwarded.
 * @returns {JSX.Element} Laptop scene component.
 */
const ProjectsScene = forwardRef(({}, ref ) => {

    // Font Reference
    const font = "./fonts/anek-bangla-v5-latin-500.woff"
    
    // Computer model
    const monitorModel = useGLTF(`${import.meta.env.BASE_URL}models/computer_monitor_lowpoly/monitor.glb`);
    const { nodes } = useGLTF('/aobox-transformed.glb')

    // Grab projects json from site reference
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        getProjects().then(projects => setProjects(projects));
    }, []);

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

    // Forwarding the ref
    useImperativeHandle(ref, () => (
    {
        // Used to tell whether the scene is hidden or not
        scale: scene.current.scale,
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
        }
    }))

    /*
     * Leva controls
    */
   const {sr_x, sr_y, sr_z, MonitorX, MonitorY, scale, portalX, portalY, portalZ, portalScale} = useControls('Projects Scene', {
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
                value: 1.46,
                step: 0.01,
            },
            portalZ: {
                value: -0.22,
                step: 0.001,
            },
            portalScale: {
                value: 1.88,
                step: 0.01,
            },
        }, {collapsed: true,}),
    })

    return (
    <group ref={scene} scale={2} visible={true} rotation={ [sr_x, sr_y, sr_z] }>

        {projects && Object.values(projects).map((project, index) => {
            if(project.id == 6){
            return (
                <>

                {/* 
                  * Project Title & description
                  */}


                {/* Monitor model */}
                <primitive key={`${project.name}-monitor`} object={monitorModel.scene} position={ [MonitorX,MonitorY,0] } scale={scale} textAlign="center">
                    {/* Monitor Portal */}
                    <mesh position={ [portalX,portalY,portalZ] } scale={portalScale}>
                        <planeGeometry args={[2, 1]} />
                        <MeshPortalMaterial >
                            <ambientLight intensity={0.5} />
                            <Environment preset="city" />
                            {/** A box with baked AO */}
                            <mesh castShadow receiveShadow position-z={-1} rotation-y={ -Math.PI * 0.5 } geometry={nodes.Cube.geometry} scale-y={0.5}>
                                <meshStandardMaterial color={'#bee3ba'} />
                                <spotLight castShadow color={'#bee3ba'} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
                            </mesh>
                        </MeshPortalMaterial>
                    </mesh>
                </primitive>

                {/* <Text key={project.name} position={[0, 0.7, 0]} font={font} fontSize={0.15} color="black" >
                    {project.name}
                </Text>
                
                <Text key={`${project.name}-description`} position={[0, 0.38, 0]} scale={0.5} font={font} fontSize={0.1} color="black" maxWidth={3} textAlign="center" anchorX="center" anchorY="middle"> 
                    {project.description}
                </Text> */}
                
                {/* Site reference (only appears if there's a reference) */}
                {project.siteReference && (
                    <mesh key={project.siteReference} position={[0.5, 0, 0]} scale={[0.2, 0.1, 0.1]} onClick={() => window.open(project.siteReference, "_blank")}>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshStandardMaterial color="darkgrey" />
                    <Text position={[0, 0, 0.1]} font={font} fontSize={0.05} color="white">
                        View Project
                    </Text>
                </mesh>
                )}

                {/* GitHub reference (only appears if there's a reference) */}
                {project.github && (
                    <group key={project.github + "group"} position={[1, 0, 0.1]} scale={0.1}>
                    <mesh key={project.github} scale-x={ 2.5 } onClick={() => window.open(project.github, "_blank")}>
                        <extrudeGeometry/>
                        <meshStandardMaterial color="#DD465A" />
                    </mesh>
                    <Text key={project.github + "text"} position={[0, 0, 1.25]} font={font} fontSize={0.5} color="white">
                        View GitHub
                    </Text>
                    </group>
                )}

                </>
            );}
        })}
    </group>
    )
})

export default ProjectsScene