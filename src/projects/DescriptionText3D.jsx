import { Center, Text3D } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from "three"
import React, { useState } from 'react';

/**
 * Holds the text for the project description in 3D space.
 * @param {*} param0 The children of the component, expected to be a string.
 * @param {*} props Additional properties passed to the component.
 * @returns a 3d text object component.
 */
function DescriptionText3D({ children, ...props })
{   
    // Load 3d text matcap
    const [textMatcap] = useLoader(THREE.TextureLoader, ['/matcaps/greyClay.png'])

    /**
     * Formats the text to fit in the 3D space
     */
    const [projectDesc] = useState( // Check if children is a string, then split it into words, then reduce the words into lines
        typeof children === 'string' ? 
        children.split(' ').reduce((acc, word) => {
            const lastLine = acc[acc.length - 1];
            if (lastLine && (lastLine + ' ' + word).length <= 45) {
                acc[acc.length - 1] = lastLine + ' ' + word;
            } else {
                acc.push(word);
            }
            return acc;
        }, []).join('\n') : ''
    );

    /**
     * The project description, used for keys
     */
    const [projectDescKey] = useState(projectDesc.substring(0, 20));

    return (
    <mesh {...props} > 
        <boxGeometry args={[0.1,0.1,0.1]} key={`${projectDescKey}-CenteringBoxGeom`} />
        <meshBasicMaterial color={'#FFFFFF'} key={`${projectDescKey}-CenteringBoxMat`} visible={false}  />
        {/* Centered Text within box */}
        <Center key={`${projectDescKey}-TitleCenter`}>
            <Text3D
                scale={0.05}
                key={`${projectDesc.substring(0, 20)}`}
                curveSegments={12}
                bevelEnabled
                bevelSize={0.05}
                bevelThickness={0.1}
                height={0.5}
                lineHeight={0.75}
                letterSpacing={-0.06}
                size={1}
                font="/fonts/Inter_Bold.json"
            >
                {projectDesc}
                <meshMatcapMaterial matcap={textMatcap} />
            </Text3D>
        </Center>
    </mesh>
    );
};

export default DescriptionText3D;