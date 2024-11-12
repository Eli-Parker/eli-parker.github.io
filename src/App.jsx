import { Html, PerformanceMonitor } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva, useControls } from "leva";
import round from "lodash.round";
import { Perf } from "r3f-perf";
import React from "react";
import "./style.css";

/**
 * Main application component that renders either a mobile warning screen or the 3D experience.
 *
 * - If the user is on a mobile device, it shows a warning message and provides options to either continue to the 3D experience or redirect to a mobile-friendly portfolio.
 * - If the user is on a desktop, it renders the 3D experience with optional performance monitoring and debug controls.
 *
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  /**
   * Define whether we're in debug mode or not
   */
  const [isDebug, setDebug] = useState(window.location.hash !== "#debug");

  /**
   * Define current pixel range
   */
  const [dpr, setDpr] = useState(1);

  /**
   * Update debug mode if it changes
   */
  useEffect(() => {
    const handleHashChange = () => {
      setDebug(window.location.hash !== "#debug");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  /**
   * Controls whether the mobile experience goes to the 3d experience.
   */
  const [continueTo3D, setContinueTo3D] = useState(false);

  /**
   * Allows the r3f perf to be toggleable.
   */
  const { showPerf } = useControls({ showPerf: false });

  // Mobile experience
  if (isMobile && !continueTo3D) {
    return <MobileExperience setContinueTo3D={setContinueTo3D} />;
  }

  // Regular Desktop experience
  else {
    return (
      <>
        {/* Show debug controls if #debug is at the end of the url */}
        <Leva hidden={isDebug} />
        <Canvas
          className="r3f"
          camera={{
            fov: 45,
            near: 0.1,
            far: 20,
            dpr: dpr,
            position: [-3, 1.5, 6],
          }}
        >
          {/* Performance monitor to reduce DPR and turn off ContactShadows for users with low performance */}

          {/* Trigger loading screen until loading finishes */}
          <Suspense fallback={<LoadingScreen />}>
            <PerformanceMonitor
              onChange={({ factor }) => setDpr(round(0.5 + 1.5 * factor, 1))}
            >
              <Experience />
            </PerformanceMonitor>
          </Suspense>
          {/* Show performance if it's enabled by the user */}
          {showPerf && <Perf position="top-left" />}
        </Canvas>
      </>
    );
  }
}

/**
 * Mobile experience component that provides a warning message and options to either continue to the 3D experience or redirect to a mobile-friendly portfolio.
 * @param {*} param0 A function that sets the continueTo3D state to true.
 * @returns A mobile experience component.
 */
const MobileExperience = ({ setContinueTo3D }) => (
  <div
    className="mobile-screen"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Leva hidden />
    <h3>
      Notice: This is an interactive 3D experience
      <br />
      which isn't optimized for mobile devices, <br />
      do you still want to continue? <br />
      <br />
      Redirect will take you to
      <br />a mobile friendly portfolio.
    </h3>
    <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
      <button
        className="button-1"
        role="button"
        onClick={() => setContinueTo3D(true)}
      >
        Continue
      </button>
      <button
        className="button-1"
        role="button"
        onClick={() =>
          (window.location.href = "https://eliparker.dev/react-site/")
        }
      >
        Redirect
      </button>
    </div>
  </div>
);

/**
 * Displays a loading screen
 * @returns the loading screen
 */
const LoadingScreen = () => (
  <Html>
    <div className="loader"></div>
  </Html>
);
