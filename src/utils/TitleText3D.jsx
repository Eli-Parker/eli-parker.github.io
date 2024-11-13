import { Center, Text3D } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from "three";
import React, { forwardRef, useMemo, useRef } from 'react';

/**
 * Holds the text for the project title in 3D space.
 * The text is centered using a box and the Center drei helper.
 * 
 * @param {string} title The children of the component, expected to be a string.
 * @param {boolean} useNormal Determines whether or not we use the white matcap material or a normal material. If true, meshNormalMaterial else matcapMaterial.
 * @param {*} props Additional properties passed to the component and applied to the mesh.
 * @returns a 3d text object component.
 */
const TitleText3D  = forwardRef(({ title, useNormal, useStandard, ...props }, ref) =>
{   
    // Load 3d text matcap
    const [textMatcap] = useLoader(THREE.TextureLoader, ['/matcaps/greyClay.png']);

    /**
     * Formats the text to fit in the 3D space
     */
    const projectTitle = useMemo(() => {
        if (typeof title !== 'string') return '';
        return title.split(' ').reduce((acc, word) => {
            const lastLine = acc[acc.length - 1];
            if (lastLine && (lastLine + ' ' + word).length <= 45) {
                acc[acc.length - 1] = lastLine + ' ' + word;
            } else {
                acc.push(word);
            }
            return acc;
        }, []).join('\n');
    }, [title]);

    // Attach the ref
    const groupRef = useRef();
    if(ref)
    {
        ref.current = groupRef.current;
    }

    return (
        <mesh {...props} ref={groupRef} > 
            <boxGeometry args={[0.1,0.1,0.1]} />
            <meshBasicMaterial color={'#FFFFFF'} visible={false} />
            {/* Centered Text within box */}
            <Center key={projectTitle.slice(0, 5)}>
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
                {/* Determine the material type based on the parameter */}
                {useNormal ? <meshNormalMaterial /> : useStandard ? <meshLambertMaterial color={'#D3D3D3'}/> : <meshMatcapMaterial matcap={textMatcap} /> }
                </Text3D>
            </Center>
        </mesh>
    );
});

export default TitleText3D;