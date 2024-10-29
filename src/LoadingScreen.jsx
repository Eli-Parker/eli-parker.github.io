import { Html } from "@react-three/drei";

/**
 * Displays a loading screen
 * @returns the loading screen
 */
export default function LoadingScreen() {

    return (
        <Html>
            <div className="loading-screen">
                <h1>Loading...</h1>
            </div>
        </Html>
    );
  }