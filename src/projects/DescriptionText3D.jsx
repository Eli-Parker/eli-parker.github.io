import { Center, Text3D } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import * as THREE from "three"

/**
 * Holds the text for the project description in 3D space.
 * @param {string} description The children of the component, expected to be a string.
 * @param {*} props Additional properties passed to the component.
 * @returns a 3d text object component.
 */
function DescriptionText3D({ description, ...props }) {
    // Load 3d text matcap
    const [textMatcap] = useLoader(THREE.TextureLoader, ['/matcaps/greyClay.png']);

    // Format the description for 3D text
    const projectDesc = wrapTextByCharCount(description);
    return (
        <mesh {...props} > 
            <boxGeometry args={[0.1,0.1,0.1]} key={`CenteringBoxGeom`} />
            <meshBasicMaterial color={'#FFFFFF'} key={`CenteringBoxMat`} visible={false}  />
            {/* Centered Text within box */}
            <Center key={projectDesc.slice(0, 5)}>
                <Text3D
                    scale={0.05}
                    curveSegments={5}
                    height={0.5}
                    lineHeight={0.75}
                    letterSpacing={0}
                    size={1}
                    font="/fonts/Inter_Bold.json"
                >
                    {projectDesc}
                    <meshMatcapMaterial matcap={textMatcap} />
                </Text3D>
            </Center>
        </mesh>
    );
}

export default DescriptionText3D;

/**
 * Wraps the input text to a specified maximum number of characters per line, preserving whole words.
 *
 * @param {string} text - The input text to wrap.
 * @param {number} [maxCharsPerLine=45] - The maximum number of characters allowed per line.
 * @returns {string} The wrapped text with line breaks inserted to ensure no line exceeds the specified character limit.
 */
function wrapTextByCharCount(text, maxCharsPerLine = 45) {
    if (typeof text !== 'string') return '';

    // Split text into words, append string until we reach the max length
    // then start a new line. Repeat until out of words.
    return text.split(' ').reduce((lines, word) => {

        // Grab line to append word onto
        const lastLine = lines[lines.length - 1];

        // Add word if it won't overflow, otherwise start a new line
        if (lastLine && (lastLine + ' ' + word).length <= maxCharsPerLine) {
            lines[lines.length - 1] = lastLine + ' ' + word;
        } else {
            lines.push(word);
        }
        
        return lines;
    }, []).join('\n');
}