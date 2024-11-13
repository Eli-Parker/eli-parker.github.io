import { handleClick, animateIn, animateOut } from "../contact/ContactScene.jsx";
import ToggleFocusButton from "../homepage/ToggleFocusButton.jsx";
import { useFrame, useThree } from "@react-three/fiber";
import DescriptionText3D from "./DescriptionText3D";
import { folder, useControls } from "leva";
import TitleText3D from "./TitleText3d";
import Logo from "../contact/Logo.jsx"; 
import * as THREE from "three";
import gsap from "gsap";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Environment,
  Float,
  MeshPortalMaterial,
  Text,
  useGLTF,
} from "@react-three/drei";

/**
 * Contains the Laptop scene used in the homepage.
 * @param {Object} props - The properties object.
 * @param {React.Ref} ref - The ref to be forwarded.
 * @returns {JSX.Element} Laptop scene component.
 */
const ProjectsScene = forwardRef((_props, ref) => {
  /*
   * Imports
   */

  // Computer model
  const monitorModel = useGLTF(`/models/computer_monitor_lowpoly/monitor.glb`);

  // Teeny keyboard model
  const teenyBoardModel = useGLTF(
    "/models/teenyBoard/cartoon_mini_keyboard.glb"
  );

  // Plant Model
  const plantModel = useGLTF("models/plant/low_poly_style_plant.glb");

  // Box model
  const { nodes } = useGLTF("/aobox-transformed.glb");

  // Object color palette
  const [colorPalette] = useState([
    "#ae2012",
    "#005f73",
    "#4f772d",
    "#43aa8b",
    "#564592",
    "#9c4724",
  ]);

  // store projects here
  const [projects] = useState([
    {
      name: "University Calendar Generator",
      siteReference: "http://eliparker.dev/UniversityOfUtahCalendarGenerator",
      description: "Scrapes the University of Utah's academic calendar website and dynamically generates an iCal file, based on user selection. Adheres to TDD and SOLID code principles.",
      github: "https://github.com/Eli-Parker/UniversityOfUtahCalendarGenerator",
      id: 1,
    },
    {
      name: "EliParker.dev",
      siteReference: "http://eliparker.dev/",
      description: "A deep dive into React and React Three Fiber. Created interactive 3D scenes, managed complex state and animations with React hooks, and payed close attention to UI/UX.",
      github: "https://github.com/Eli-Parker/eli-parker.github.io",
      id: 2,
    },
    {
      name: "Galaxy Generator",
      siteReference: "http://eliparker.dev/Galaxy-Generator",
      description: "Three-js project that uses particles and visual algorithms to generate an interactive three-dimensional galaxy.",
      github: "https://github.com/Eli-Parker/Galaxy-Generator",
      id: 3,
    },
    {
      name: "Text Generation Algorithm",
      siteReference: "",
      description: "Java program that dynamically generates text based on a given input text. Based on Markov Chains. \n (Code is available to employers upon request)",
      github: "",
      id: 4,
    },
    {
      name: "React Site",
      siteReference: "http://eliparker.dev/react-site/",
      description: "Standard portfolio site built with React. Showcases understanding of modern web dev practices including component-based architecture, state management with hooks, and responsive design.",
      github: "https://github.com/Eli-Parker/react-site",
      id: 5,
    },
    {
      name: "Spreadsheet",
      siteReference: "https://eliparker.dev/CS3500SpreadsheetGUI/",
      description: "Spreadsheet web app which works similar to Excel. Composed of robust and test-driven C# class libaries and an intuitive blazor GUI. Developed at the U of U with my partner! \n (Code is available to employers upon request)",
      github: "",
      id: 6,
    },
  ]);

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
    if (scene.current.visible) {
      // Animate the logos if they exist
      if (githubLogoRef.current) {
        githubLogoRef.current.position.y =
          0.01 * Math.sin(state.clock.getElapsedTime() * 1.8) - 0.35; // Adjust the rotation speed as needed
      }
      if (siteLogoRef.current) {
        siteLogoRef.current.position.y =
          0.01 * Math.cos(state.clock.getElapsedTime() * 1.75) - 0.35; // Adjust the rotation speed as needed
      }
    }
  });

  // Forwarding the ref, used to trigger animations in experience.jsx
  useImperativeHandle(ref, () => ({
    // Used to tell whether the scene is hidden or not
    scale: scene.current.scale,

    /** Toggle the in/out animation */
    toggleAnimateOut: () => {
      toggleAnimation(scene, camera, isAnimating, setIsAnimating);
    },

    /**  Toggle scene vis without the animation*/
    toggleOut: () => {
      ToggleNoAnimation(scene, isAnimating, setIsAnimating);
    },
  }));

  /*
   * Leva controls
   */
  const {
        sp_x, sp_y, sp_z,
        sr_x, sr_y, sr_z,
        MonitorX, MonitorY, scale,
        portalX, portalY, portalZ, portalScale,
        KbrdX, KbrdY, KbrdZ, KbrdScl,
        PlntX, PlntY, PlntZ, PlntScl,
    } = useControls(
    "Projects Scene",
    {
        "Scene Position": folder(
            { sp_x: 0.0, sp_y: -0.15, sp_z: -0.2 },
            { collapsed: true }
        ),

      "Scene rotation": folder(
        { sr_x: -0.1177, sr_y: -0.0544, sr_z: -0 },
        { collapsed: true }
      ),

      "Monitor Ctrls": folder(
        {
          MonitorX: { value: 0, step: 0.01 },
          MonitorY: { value: -0.28, step: 0.01 },
          scale: { value: 0.5, step: 0.01 },
        },
        { collapsed: true }
      ),

      "teenyBoard Ctrls": folder(
        {
          KbrdX: { value: 0, step: 0.01 },
          KbrdY: { value: -0.3, step: 0.01 },
          KbrdZ: { value: 0.57, step: 0.01 },
          KbrdScl: { value: 0.0036, step: 0.0001 },
        },
        { collapsed: true }
      ),

      "Plant Ctrls": folder(
        {
          PlntX: { value: -1.19, step: 0.01 },
          PlntY: { value: -0.31, step: 0.01 },
          PlntZ: { value: -0.07, step: 0.01 },
          PlntScl: { value: 0.00106, step: 0.00001 },
        },
        { collapsed: true }
      ),

      "Portal Ctrls": folder(
        {
          portalX: { value: 0, step: 0.01 },
          portalY: { value: 1.45, step: 0.01 },
          portalZ: { value: -0.22, step: 0.001 },
          portalScale: { value: 1.89, step: 0.01 },
        },
        { collapsed: true }
      ),

      projectNum: {
        value: 0,
        min: 0,
        max: 5,
        step: 1,
        onChange: (v) => {
          setProjectNumber(v);
        },
      },
    },
    { collapsed: true }
  );

  /**
   * Lets the setProjNum method know if its been called recently,
   * to prevent users from spamming the change projects buttons.
   */
  const [projectButtonCooldown, setProjectButtonCooldown] = useState(false);

  /**
   * Sets the project number to the given project number, with checks to make sure it doesn't go out of bounds
   * @param {*} number the proj number to set
   */
  async function setProjNum(number) {
    // Button is on a cooldown if this is true
    if (projectButtonCooldown) return;

    // Make sure the buttons cant be spammed
    setProjectButtonCooldown(true);

    const min = 0;
    const max = projects.length;

    // Format number for infinite scrolling of projects
    let formattedNumber = number % max;

    // Wrap around number if it's below 0
    if (formattedNumber === -1) {
      formattedNumber = max - 1;
    }

    // Set number
    setProjectNumber(formattedNumber);

    // Wait half a second
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Allow button to be pressed again
    setProjectButtonCooldown(false);
  }

  /*
   * Project variables
   */

  const [projectNumber, setProjectNumber] = useState(0);
  const [projectTitle, setProjTitle] = useState(
    projects[projectNumber].name
  );
  const [projectDesc, setProjDesc] = useState(
    projects[projectNumber].description
  );
  const [projectSite, setProjSite] = useState(
    projects[projectNumber].siteReference
  );
  const [projectGitHub, setProjGitHub] = useState(
    projects[projectNumber].github
  );

  // Update them when the project number changes
  useEffect(() => {
    setProjTitle(projects[projectNumber].name);
    setProjDesc(projects[projectNumber].description);
    setProjSite(projects[projectNumber].siteReference);
    setProjGitHub(projects[projectNumber].github);
  }, [projectNumber]);

  // Site and Github positions, here to center the icon if the other icon doesn't exist
  const [githubPositionX, setGithubPositionX] = useState(-0.3);
  const [sitePositionX, setSitePositionX] = useState(0.3);

  // UseEffect to update the positions of the logos whenever they change

  /* This is a separate useEffect because it doesn't detect properly
   * when grouped with above useEffect, or when using
   * projectNumber as the effect change value
   */
  useEffect(() => {
    // Update logo positions based on the presence of the other model
    if (projectGitHub !== "" && projectSite !== "") {
      setGithubPositionX(-0.3);
      setSitePositionX(0.3);
    } else if (projectGitHub !== "") {
      setGithubPositionX(0);
    } else if (projectSite !== "") {
      setSitePositionX(0);
    }
    // If neither are here do nothing, positions of objects that aren't visible don't matter
  }, [projectGitHub]);

  // Tracks if a component was clicked recently, prevents spamming
  const [recentClick, setrecentClick] = useState(false);

  // State for focusing the arrows
  const [focusedLogo, setFocusedLogo] = useState("start");

  const rightArrow = useRef()
  const leftArrow = useRef()

  // Change animations when logo is focused
  useEffect(() => {
    switch (focusedLogo) {
      case "none":
        animateOut([leftArrow, rightArrow]);
        break;

      case "left":
        animateOut([rightArrow]);
        animateIn([leftArrow]);
        break;
        
      case "right":
        animateOut([leftArrow]);
        animateIn([rightArrow]);
      default:
        break;
        
    }
  }, [focusedLogo]);

  // START OF RETURN (here for legibility) ***********
  return (
    <group
      key={"FullProjectScene"}
      ref={scene}
      scale={2}
      visible={true}
      position={[sp_x, sp_y, sp_z]}
      rotation={[sr_x, Math.PI - sr_y, sr_z]}
    >
      <Float rotationIntensity={0.4} floatIntensity={0.1}>
        {/* Monitor model */}
        <primitive
          key={`projectMonitor`}
          object={monitorModel.scene}
          position={[MonitorX, MonitorY, 0]}
          scale={scale}
          textAlign="center"
        >
          {/* Monitor Portal */}
          <mesh
            key={`monitorPortal`}
            position={[portalX, portalY, portalZ]}
            scale={portalScale}
          >
            <planeGeometry key={`monitorPortalPlane`} args={[2, 1]} />

            {/* Portal Material, everything inside appears in a 'separate' space */}
            <MeshPortalMaterial key={`monitorPortalMat`}>

              {/* Portal lighting */}
              <ambientLight intensity={0.5} key={`monitorPortalAmbLi`} />
              <Environment preset="city" key={`monitorPortalEnv`} />

              {/** Inner box */}
              <mesh
                castShadow
                receiveShadow
                rotation-y={-Math.PI * 0.5}
                geometry={nodes.Cube.geometry}
                scale-y={0.5}
                scale-x={0.5}
                key={`innerBox`}
              >
                {/* Mesh */}
                <meshStandardMaterial
                  color={colorPalette[projectNumber % 6]}
                  key={`innerBoxMat`}
                />
                <spotLight
                  castShadow
                  color={colorPalette[projectNumber % 6]}
                  intensity={2}
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={1}
                  shadow-normalBias={0.05}
                  shadow-bias={0.0001}
                  key={`innerBoxSpotLight`}
                />
              </mesh>

              {/* Title 3D Text */}
              <TitleText3D title={projectTitle} position={[0, 0.35, -0.1]} />

              {/* Description 3D Text */}
              <DescriptionText3D
                position={[0, 0, -0.25]}
                description={projectDesc}
              />

              {/* Arrows to toggle between projects */}
              <TitleText3D
                ref={leftArrow}
                title={"←"}
                useNormal
                position={[-0.9, 0, -0.2]}
                onClick={() => {
                  setProjNum(projectNumber - 1);
                }}
                onPointerEnter={() => setFocusedLogo("left")}
                onPointerLeave={() => setFocusedLogo("none")}
              />
              <TitleText3D
                ref={rightArrow}
                title={"→"}
                useNormal
                position={[0.9, 0, -0.2]}
                onClick={() => {
                  setProjNum(projectNumber + 1);
                }}
                onPointerEnter={() => setFocusedLogo("right")}
                onPointerLeave={() => setFocusedLogo("none")}
              />

              {/* GitHub reference link (only appears if there's a reference) */}
              <Logo 
                ref={githubLogoRef}
                key={`githubRef`}
                kind="github" 
                position={[githubPositionX, -0.35, -0.2]}
                rotation={[0,Math.PI / 2,0]}
                scale={0.3}
                visible={projectGitHub !== ""}
                onClick={() => handleClick(projectGitHub, recentClick, setrecentClick)}
              />

              {/* Site reference link (only appears if there's a reference) */}
              <Logo 
                ref={siteLogoRef}
                key={`siteref`}
                kind="website" 
                position={[sitePositionX, -0.35, -0.2]}
                rotation={[0,Math.PI / 2,0]}
                scale={0.3}
                visible={projectSite !== ""}
                onClick={() => handleClick(projectSite, recentClick, setrecentClick)}
              />

            </MeshPortalMaterial>
          </mesh>
        </primitive>

        {/* Projects title */}
        <Text
          font={"./fonts/anek-bangla-v5-latin-600.woff"}
          fontSize={0.3}
          position={[1.4, 0.5, 0.4]}
          rotation-y={-1}
          rotation-z={0}
          maxWidth={2}
          lineHeight={1}
          color="#87ceeb"
        >
          Projects
        </Text>

        {/* Focus button */}
        <ToggleFocusButton scale={0.5} rotation={[-0.3,0,0]} position={[0,-0.23,-0.1]} page={'projects'} />

        {/* Plant */}
        <primitive
          key={"projectPlant"}
          object={plantModel.scene}
          position={[PlntX, PlntY, PlntZ]}
          scale={PlntScl}
        />

        {/* Teeny Board */}
        {/* Put teeny board in a different float so it feels separated from the rest of the scene */}
        <Float rotationIntensity={0.4} floatIntensity={0}>
          <primitive
            key={`projectTeenyBoard`}
            object={teenyBoardModel.scene}
            position={[KbrdX, KbrdY, KbrdZ]}
            scale={KbrdScl}
          />
        </Float>
      </Float>
    </group>
  );
});

export default ProjectsScene;


/**
 * Toggles the animation in and out for the scene.
 * @param {Object} scene The scene to animate
 * @param {THREE.Camera} camera the scene camera, used in GSAP animations
 * @param {boolean} isAnimating The state of the animation
 * @param {Function} setIsAnimating The function to set the state of the animation
 */
function toggleAnimation(scene, camera, isAnimating, setIsAnimating) {
  // stop animation from being called multiple times
  if (isAnimating) {
    return;
  }

  // Set the state to animating
  setIsAnimating(true);

  // Toggle visibility
  scene.current.visible = true;

  // Toggle scale
  const targetScale =
    scene.current.scale.x === 2 ? { x: 0, y: 0, z: 0 } : { x: 2, y: 2, z: 2 };

  // Target rotation
  const targetRotation =
    scene.current.scale.x === 2 ? Math.PI - 0.1575 : -0.1575;

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
      if (targetScale.x === 0) {
        scene.current.visible = false;
      }
      setIsAnimating(false);
    },
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
    },
  });
}

/**
 * Toggles the scene without the animation.
 * @param {Object} scene the scene to toggle
 * @param {boolean} isAnimating The state of the animation
 * @param {Function} setIsAnimating Function to set the state of the animation
 */
function ToggleNoAnimation(scene, isAnimating, setIsAnimating) {
  // stop animation from being called multiple times
  if (isAnimating) {
    return;
  }

  // Set the state to animating
  setIsAnimating(true);

  // Toggle visibility
  scene.current.visible = true;

  // Toggle scale
  if (scene.current.scale.x > 0) {
    scene.current.scale.x = 0;
    scene.current.scale.y = 0;
    scene.current.scale.z = 0;

    // If the scale is 0, hide the scene
    scene.current.visible = false;
  } else {
    scene.current.scale.x = 2;
    scene.current.scale.y = 2;
    scene.current.scale.z = 2;
  }

  // Set the state to not animating
  setIsAnimating(false);
}
