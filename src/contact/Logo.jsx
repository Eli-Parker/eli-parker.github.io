import { useGLTF } from '@react-three/drei';
import { forwardRef, useRef } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * Returns a logo object in 3D space.
 * @param {*} props Additional properties passed to the component, which are applied to the mesh.
 * @returns A 3d logo object component.
 */
const Logo = forwardRef(({ kind, ...props }, ref) => {  

    /**
     * State for the logo kind
     */
    const logoKind = kind || 'linkedin';
    let logoPath;

    if (logoKind === 'github') {
        logoPath = '/models/socialMediaIcons/github.glb';
    } else if (logoKind === 'email') {
        logoPath = '/models/socialMediaIcons/email.glb';
    } else if (logoKind === 'website') {
        logoPath = "models/socialMediaIcons/website-icon/source/website.glb";
    } else {
        logoPath = '/models/socialMediaIcons/linkedin.glb';
    }
    
    // Model file
    const logoModel = useGLTF(logoPath);
    let clonedLogo;

    // Clone the model
    if (logoKind === 'email') {
        clonedLogo = clone(logoModel.scene.children[0].children[0].children[0].children[0]);
    } else {
        clonedLogo = clone(logoModel.scene.children[0]);
    }

    // Set logo position and rotation
    clonedLogo.position.set(0, 0, 0);
    clonedLogo.rotation.set(Math.PI / 2, 0, Math.PI / 2);

    // Set the object's scale
    if (logoKind === 'github') 
    {
        clonedLogo.scale.set(10, 10, 10);
    } else if (logoKind === 'email') 
    {
        // Set logo position
        clonedLogo.position.set(0, -0.1, 0);

        // Scale and Rotation
        clonedLogo.scale.set(0.03, 0.03, 0.03);
        clonedLogo.rotation.set(0, -Math.PI / 2, 0);
    } else if (logoKind === 'website') {

        // Website logo
        clonedLogo.scale.set(0.035, 0.035, 0.035);
        clonedLogo.position.set(0.15, 0, 0);
    } else {
        // LinkedIn logo
        clonedLogo.scale.set(0.3, 0.3, 0.3);
    }

    // Attach the ref
    const groupRef = useRef();
    if(ref)
    {
        ref.current = groupRef.current;
    }

    return (
        <group {...props} ref={groupRef}>
            {/* Box the size of the logo so we can figure out hover without using complex geom */}
            <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshBasicMaterial color={'#FFFFFF'} visible={false} />
            </mesh>
            <primitive object={clonedLogo}/>
        </group>
    )
})

export default Logo;