import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useGLTF, Text, Html, Float } from "@react-three/drei";
import ToggleFocusButton from "./ToggleFocusButton";
import { useThree } from "@react-three/fiber";
import MagicBox from "./MagicBox";
import gsap from "gsap";

/**
 * Contains the Laptop scene used in the homepage.
 * @param {Object} props - The properties object.
 * @param {React.Ref} ref - The ref to be forwarded.
 * @returns {JSX.Element} Laptop scene component.
 */
const LaptopScene = forwardRef(({}, ref) => {
  // Computer model
  const computer = useGLTF(
    "https://threejs-journey.com/resources/models/macbook_model.gltf"
  );

  // Font Reference
  const font = "./fonts/anek-bangla-v5-latin-500.woff";

  // State of properties
  const [isAnimating, setIsAnimating] = useState(false);

  // Scene reference
  const scene = useRef();
  const { camera } = useThree();

  // Forwarding the ref
  useImperativeHandle(ref, () => ({
    // Used to tell whether the scene is hidden or not
    scale: scene.current.scale,

    // Toggle the animation
    toggleAnimateOut: () => {
      // stop animation from being called multiple times
      if (!isAnimating) {
        // Set the state to animating
        setIsAnimating(true);

        // Toggle visibility
        scene.current.visible = true;

        // Toggle scale
        const targetScale =
          scene.current.scale.x === 1
            ? { x: 0, y: 0, z: 0 }
            : { x: 1, y: 1, z: 1 };

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
      }
    },
    // Toggle without the animation
    toggleOut: () => {
      // stop animation from being called multiple times
      if (!isAnimating) {
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
          scene.current.scale.x = 1;
          scene.current.scale.y = 1;
          scene.current.scale.z = 1;
        }

        // Set the state to not animating
        setIsAnimating(false);
      }
    },
  }));

  return (
    <Float rotationIntensity={0.4} ref={scene}>
      {/* Laptop Model */}
      <primitive object={computer.scene} position-y={-1.2}>
        {/* My React Website within laptop model so they're grouped */}
        <Html
          transform
          wrapperClass="htmlScreen"
          distanceFactor={1.17}
          position={[0, 1.56, -1.4]}
          rotation-x={-0.256}
          occlude="blending"
        >
          <iframe src="https://eliparker.dev/react-site/" />
        </Html>
      </primitive>

      {/* ELI PARKER Name Text */}
      <Text
        font={font}
        fontSize={0.75}
        position={[2.5, 0.5, -0.3]}
        rotation-y={-1}
        rotation-z={0.1}
        maxWidth={2}
        lineHeight={1}
        color="#87ceeb"
      >
        Eli Parker
      </Text>

      {/* Tooltip Text */}
      <Text
        font={font}
        fontSize={0.125}
        position={[-2, 0.75, -1.25]}
        rotation={[-0, -0.1, 0]}
        maxWidth={2}
        lineHeight={1}
        color="#87ceeb"
      >
        {"Scroll me! →\n\nClick and drag\nto rotate"}
      </Text>

      {/* Button to move closer to/away from the laptop */}
      <ToggleFocusButton position={[0, 1.6, -1.8]} />

      {/* Magic box display */}
      <MagicBox position={[2.8, 1.05, 0]} rotation={[-0.1, 1, 0]} />
    </Float>
  );
});

export default LaptopScene;
