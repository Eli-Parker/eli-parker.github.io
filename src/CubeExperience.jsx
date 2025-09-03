import {
  Html,
  PresentationControls,
  usePerformanceMonitor,
  OrbitControls,
  Box,
  SpotLight,
} from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import * as THREE from 'three'


export default function CubeExperience() {

    
    return ( <>
        <OrbitControls />
            <SpotLight
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
                position={[0,5,5]}
            />
            <ambientLight intensity={0.2} />
            <Box>
                <meshStandardMaterial castShadow receiveShadow color={0xff0000}/>
            </Box>
            <BoxesOutline />
    </>);
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

/**
 * Creates a line with a start and end point,
 * given by Paul Henschel originally
 * @param {*} param0 
 * @returns 
 */
function Line({ start, end }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink"  />
    </line>
  )
}