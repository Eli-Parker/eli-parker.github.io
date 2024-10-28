import { Html, useProgress } from "@react-three/drei";

/**
 * Displays a loading screen
 * @returns the loading screen
 */
export default function LoadingScreen() {
  
    const { progress } = useProgress();

    return (
        <Html>
            <div className="loading-screen">
                Loading: {progress.toFixed(2)}%
            </div>
        </Html>
    );
  }