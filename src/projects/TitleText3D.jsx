import { Center, Text3D } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from "three"
import React from 'react';

/**
 * Holds the text for the project title in 3D space.
 * @param {string} title The children of the component, expected to be a string.
 * @param {*} props Additional properties passed to the component.
 * @returns a 3d text object component.
 */
function TitleText3D({ title, ...props })
{   
    // Load 3d text matcap
    const [textMatcap] = useLoader(THREE.TextureLoader, ['/matcaps/greyClay.png'])

    /**
     * Formats the text to fit in the 3D space
     */
    const projectTitle = typeof title === 'string' ? 
    title.split(' ').reduce((acc, word) => {
        const lastLine = acc[acc.length - 1];
        if (lastLine && (lastLine + ' ' + word).length <= 45) {
            acc[acc.length - 1] = lastLine + ' ' + word;
        } else {
            acc.push(word);
        }
        return acc;
    }, []).join('\n') : '';

    return (
    <mesh {...props} > 
        <boxGeometry args={[0.1,0.1,0.1]} />
        <meshBasicMaterial color={'#FFFFFF'} visible={false} />
        {/* Centered Text within box */}
        <Center key={projectTitle}>
            <Text3D
                scale={ 0.1 }
                key={`Textddd`}
                curveSegments={32}
                bevelEnabled
                bevelSize={0.04}
                bevelThickness={0.1}
                height={0.5}
                lineHeight={0.5}
                letterSpacing={-0.06}
                size={1}
                font="/fonts/Inter_Bold.json"
            >
                {projectTitle}
            <meshMatcapMaterial matcap={textMatcap} />
            </Text3D>
        </Center>
    </mesh>
    );
};

export default TitleText3D;