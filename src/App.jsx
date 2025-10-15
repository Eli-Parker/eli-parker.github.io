import { Html, PerformanceMonitor, useGLTF } from "@react-three/drei";
import { Suspense, lazy, useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience.jsx";
import { Leva, useControls } from "leva";
import round from "lodash.round";
import { Perf } from "r3f-perf";
import "./style.css";

/**
 * Main application component that renders either a mobile warning screen or the 3D experience.
 *
 * Renders the 3D experience with optional performance monitoring and debug controls.
 *
 * @returns {JSX.Element} The rendered application component.
 */
export default function App() {
  
  // Figure out if we're in debug mode
  const [isDebug, setDebug] = useState(window.location.hash !== "#debug");

  // Define current pixel range
  const [dpr, setDpr] = useState(1);

  // Lazy Load Scenes
  const LazyLaptopScene = lazy(() => import("./homepage/LaptopScene"));
  const LazyProjectsScene = lazy(() => import("./projects/ProjectsScene"));
  const LazyContactScene = lazy(() => import("./contact/ContactScene"));

  // Warm up route chunks after initial render so switching pages later is instant
  useEffect(() => {
    // Defer to avoid competing with critical path
    const id = setTimeout(() => {
      import("./projects/ProjectsScene");
      import("./contact/ContactScene");
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Update debug mode if it changes
  useEffect(() => {
    const handleHashChange = () => {
      setDebug(window.location.hash !== "#debug");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Removed legacy mobile gate; site is now mobile-optimized
  const getFsElement = () => (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    null
  );
  const [isFullscreen, setIsFullscreen] = useState(() => !!getFsElement());
  const getIsPortrait = () => {
    const m = window.matchMedia && window.matchMedia("(orientation: portrait)");
    return (m && m.matches) || window.innerHeight > window.innerWidth;
  };
  const [isPortrait, setIsPortrait] = useState(() => getIsPortrait());
  const [fsSupported, setFsSupported] = useState(() => {
    const el = document.documentElement;
    return !!(
      el.requestFullscreen ||
      el.webkitRequestFullscreen ||
      el.msRequestFullscreen ||
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.msFullscreenEnabled
    );
  });

  // Derived: show overlay if on mobile 3D, portrait or not fullscreen
  const showMobileOverlay = useMemo(() => {
    if (!isMobile) return false;
    // Require landscape always; require fullscreen only if supported
    const needsLandscape = isPortrait;
    const needsFullscreen = fsSupported && !isFullscreen;
    return needsLandscape || needsFullscreen;
  }, [isMobile, isPortrait, isFullscreen, fsSupported]);

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!getFsElement());
    const onResize = () => setIsPortrait(getIsPortrait());
    const onOrientationChange = () => setIsPortrait(getIsPortrait());
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    document.addEventListener("msfullscreenchange", onFsChange);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onOrientationChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFsChange);
      document.removeEventListener("webkitfullscreenchange", onFsChange);
      document.removeEventListener("msfullscreenchange", onFsChange);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onOrientationChange);
    };
  }, []);

  const enterFullscreen = async () => {
    try {
      // Prefer the R3F canvas if available, then <html>, then <body>
      const canvas = document.querySelector('canvas');
      const target = (canvas instanceof Element ? canvas : null) || document.documentElement || document.body;
      if (target.requestFullscreen) await target.requestFullscreen();
      else if (target.webkitRequestFullscreen) await target.webkitRequestFullscreen();
      else if (target.msRequestFullscreen) await target.msRequestFullscreen();

      // Best-effort orientation lock after fullscreen
      if (screen.orientation && screen.orientation.lock) {
        try { await screen.orientation.lock("landscape"); } catch (_) {}
      }
      // Fallback state update in case change event is delayed
      setIsFullscreen(!!getFsElement());
    } catch (_) {
      // If fullscreen fails (common on some iOS/Safari cases), stop requiring it
      setFsSupported(false);
    }
  };

  /**
   * Allows the r3f perf to be toggle-able.
   */
  const { showPerf } = useControls('General', { showPerf: false }, {collapsed: true});

  // Always render the experience (mobile is supported)
    return (
      <>
        {/* Show debug controls if #debug is at the end of the url */}
        {isDebug && <Leva hidden={isDebug} />}
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
              <Experience
                LazyLaptopScene={LazyLaptopScene} 
                LazyProjectsScene={LazyProjectsScene}
                LazyContactScene={LazyContactScene}

              />
            </PerformanceMonitor>
          </Suspense>
          {/* Show performance if it's enabled by the user */}
          {showPerf && <Perf position="top-left" />}
        </Canvas>
        {showMobileOverlay && (
          <RotateFullscreenOverlay
            isPortrait={isPortrait}
            isFullscreen={isFullscreen}
            fsSupported={fsSupported}
            onEnterFullscreen={enterFullscreen}
          />
        )}
      </>
    );
}


/**
 * Displays a loading screen
 * @returns the loading screen
 */
const LoadingScreen = () => (
  <Html>
    <div className="loader"></div>
  </Html>
);

// Preload heavy GLTF assets at app startup so lazy scenes don't hitch when shown
useGLTF.preload('/models/computer_monitor_lowpoly/monitor.glb');
useGLTF.preload('/models/teenyBoard/cartoon_mini_keyboard.glb');
useGLTF.preload('models/plant/low_poly_style_plant.glb');
useGLTF.preload('/aobox-transformed.glb');

/**
 * Mobile overlay that prompts users to rotate to landscape and enter fullscreen.
 * Blocks pointer events to the scene while visible.
 */
function RotateFullscreenOverlay({ isPortrait, isFullscreen, onEnterFullscreen, fsSupported }) {
  return (
    <div className="mobile-overlay" role="dialog" aria-live="polite">
      <div className="mobile-overlay__card">
        <div>
          <h3 style={{ marginTop: 0 }}>Best viewed in landscape</h3>
          {isPortrait && (
            <p className="text-body">Please rotate your phone to continue.</p>
          )}
          {fsSupported && !isFullscreen && (
            <>
              <p className="text-body">For the best experience, enter fullscreen.</p>
              <button className="btn" onClick={onEnterFullscreen}>Enter fullscreen</button>
            </>
          )}
        </div>
        <div className="mobile-overlay__footer">
          <p className="text-small" style={{ marginBottom: 8 }}>
            Prefer not to use the 3D experience? There’s a 2D version you can browse instead.
          </p>
          <a className="btn" href="/react-site/" target="_self" role="button">
            Go to 2D version
          </a>
        </div>
      </div>
    </div>
  );
}
