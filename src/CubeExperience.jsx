import {
  PresentationControls,
  Box,
  SpotLight,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from 'three'


export default function CubeExperience() {
    const { camera } = useThree();
    return ( <>
            <MovingSpot  color="#ffffff" 
                position={[0, 2, 5]} 
                castShadow
                penumbra={0.2}
                radiusTop={0.1}
                radiusBottom={40}
                distance={50}
                angle={0.45}
                attenuation={200}
                anglePower={5}
                intensity={10}
                opacity={0.05}
            />
            <ambientLight intensity={0.2} />
            <PresentationControls 
                global
                // Global rotation
                rotation={[0, 0, 0]}
                // Amount of vertical rotation
                polar={[-0.4, 0.2]}
                // Amt Horizontal rotation
                azimuth={[-1, 0.75]}
                // Animation for dragging
                config={{ mass: 2, tension: 400 }}
                // animation to snap back on release
                snap={{ mass: 4, tension: 400 }}
            >
            <Box>
                <meshStandardMaterial castShadow receiveShadow color={0xff0000}/>
            </Box>
            <BoxesOutline />
            </PresentationControls>
    </>);
}

function MovingSpot({ vec = new THREE.Vector3(), ...props }) {
  const light = useRef()
  const viewport = useThree((state) => state.viewport)
  useFrame((state) => {
    light.current.target.position.lerp(vec.set((state.mouse.x * viewport.width) / 2, (state.mouse.y * viewport.height) / 2, 0), 0.1)
    light.current.target.updateMatrixWorld()
  })
  return <SpotLight castShadow ref={light} penumbra={1} distance={6} angle={0.35} attenuation={5} anglePower={4} intensity={2} {...props} />
}

function BoxesOutline() {
    const outlineSpacing = 2.5;
    return(<>
        {/* Side Pillars */}
        <Box position={[outlineSpacing,0,outlineSpacing]} scale={[0.1,5,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[-outlineSpacing,0,outlineSpacing]} scale={[0.1,5,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[outlineSpacing,0,-outlineSpacing]} scale={[0.1,5,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[-outlineSpacing,0,-outlineSpacing]} scale={[0.1,5,0.1]}>
            <BoxesMaterial />
        </Box>

        {/* Bottoms */}
        <Box position={[0,-outlineSpacing,-outlineSpacing]} scale={[5.1,0.1,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[0,-outlineSpacing,outlineSpacing]} scale={[5.1,0.1,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[-outlineSpacing,-outlineSpacing,0]} scale={[0.1,0.1,5.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[outlineSpacing,-outlineSpacing,0]} scale={[0.1,0.1,5.1]}>
            <BoxesMaterial />
        </Box>

        {/* Tops */}
        <Box position={[0,outlineSpacing,outlineSpacing]} scale={[5.1,0.1,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[0,outlineSpacing,-outlineSpacing]} scale={[5.1,0.1,0.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[-outlineSpacing,outlineSpacing,0]} scale={[0.1,0.1,5.1]}>
            <BoxesMaterial />
        </Box>
        <Box position={[outlineSpacing,outlineSpacing,0]} scale={[0.1,0.1,5.1]}>
            <BoxesMaterial />
        </Box>
    </>);
}

function BoxesMaterial() {
    return <meshStandardMaterial color={0xffffff} castShadow receiveShadow/>;
}