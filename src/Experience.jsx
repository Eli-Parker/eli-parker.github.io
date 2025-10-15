import {
  Html,
  Environment,
  ContactShadows,
  PresentationControls,
  OrbitControls,
} from "@react-three/drei";
import { useCallback, useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense } from "react";

/**
 * Contains the full R3F experience
 * @returns the R3F experience
 */
export default function Experience({
  LazyLaptopScene, 
  LazyProjectsScene,
  LazyContactScene,
}) {

  // Toggle for finished loading
  const [loading, setLoading] = useState(true);

  // Toggle for animation
  const [animating, setAnimating] = useState(false);

  // Currently selected page set to start so we can animate in
  const [currentPageName, setCurrentPageName] = useState("home");

  // Page refs
  const home = useRef();
  const projects = useRef();
  const contact = useRef();

  // Ref to see when home is ready
  const homeReady = useRef(false);

  // Import camera for gsap animation
  const { camera } = useThree();

  /* Called on first render
   * Used to load the program and do transition animation
   */
  useEffect(() => {
    // Define load function async
    async function load() {
      // Set loading
      setLoading(true);
      setAnimating(true);

      // Wait 0.75 seconds before completing loading
      setTimeout(() => {
        setLoading(false);
        setAnimating(false);

        // If Laptop already mounted while loading, animate it in now
        if (homeReady.current && home.current && home.current.scale && home.current.scale.x === 0) {
          home.current.toggleAnimateOut();
        }
      }, 750);
    }

    // Call load
    load();
  }, []);

 // Animate homepage in when it exists (and after loading screen is gone)
  const onLoad = useCallback(() => {
    homeReady.current = true;
    if (!loading && home.current && home.current.scale && home.current.scale.x === 0) {
      home.current.toggleAnimateOut();
    }
  }, [loading]);
  
  /**
   * Sets the current page and plays an animation to switch to it.
   * @param {*} pageName the name of selected page.
   */
  async function SetPage(pageName) {
    if (animating) return;
    if (pageName === currentPageName) return;

    // Set animating
    setAnimating(true);

    // Animate all pages out
    if (home.current && home.current.scale.x > 0) {
      home.current.toggleAnimateOut();
    }
    if (projects.current && projects.current.scale.x > 0) {
      projects.current.toggleAnimateOut();
    }
    if (contact.current && contact.current.scale.x > 0) {
      contact.current.toggleAnimateOut();
    }

    // wait for animation to finish
    await new Promise((r) => setTimeout(r, 500));

    // Set the current page
    setCurrentPageName(pageName);

    // Animate new page in
    if (pageName === "home" && home.current && home.current.scale.x === 0)
      home.current.toggleAnimateOut();
    if (pageName === "projects" && projects.current && projects.current.scale.x === 0)
      projects.current.toggleAnimateOut();
    if (pageName === "contact" && contact.current && contact.current.scale.x === 0)
      contact.current.toggleAnimateOut();

    // wait for animation to finish
    await new Promise((r) => setTimeout(r, 500));

    // Set animating
    setAnimating(false);
  }

  /**
   * Allows us to use orbit controls on the debug screen.
   */
  const { orbitControls } = useControls('General', { orbitControls: false });


  return (
    <>

      {/* NavBar */}
      <Html
        center
        position={[0, 2.4, 0]}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          padding: "10px",
          fontFamily: "Anek Bangla, sans-serif",
        }}
      >
        <a
          onClick={() => SetPage("home")}
          style={{
            padding: "10px",
            color: currentPageName === "home" ? "#87ceeb" : "white",
            textDecoration: "none",
          }}
        >
          HOME
        </a>
        <a
          onClick={() => SetPage("projects")}
          style={{
            padding: "10px",
            color: currentPageName === "projects" ? "#87ceeb" : "white",
            textDecoration: "none",
          }}
        >
          PROJECTS
        </a>
        <a
          onClick={() => SetPage("contact")}
          style={{
            padding: "10px",
            color: currentPageName === "contact" ? "#87ceeb" : "white",
            textDecoration: "none",
          }}
        >
          CONTACT
        </a>
      </Html>

      {/* Controls reflections and lighting */}
      <Environment preset="city" />

      {/* Background color */}
      <fog attach="fog" args={["#2d3137", 10, 20]} />


      {/* Wall for fog */}
      <mesh rotation={[0, -Math.PI * 0.25, 0]} position={[10, -1.5, -30]}>
        <planeGeometry args={[100, 30]} />
        <meshBasicMaterial color="#2d3137" />
      </mesh>

      {/* Scenes */}

      <Suspense fallback={null}>
        {orbitControls ? (
          <>
            <OrbitControls />
            <LazyLaptopScene ref={home} onLoad={onLoad} />
            <LazyProjectsScene ref={projects} />
            <LazyContactScene ref={contact} />
          </>
        ) : (
          <PresentationControls
            global
            // Global rotation
            rotation={[0.13, 0.1, 0]}
            // Amount of vertical rotation
            polar={[-0.4, 0.2]}
            // Amt Horizontal rotation
            azimuth={[-1, 0.75]}
            // Animation for dragging
            config={{ mass: 2, tension: 400 }}
            // animation to snap back on release
            snap={{ mass: 4, tension: 400 }}
          >
            <LazyLaptopScene ref={home} onLoad={onLoad} />
            <LazyProjectsScene ref={projects} />
            <LazyContactScene ref={contact} />
          </PresentationControls>
        )}
      </Suspense>
    <ContactShadows
        position-y={-1.4}
        opacity={0.4}
        scale={10}
        blur={2.4}
    />
  </>);
}
