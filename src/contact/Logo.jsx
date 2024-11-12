import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * Returns a logo object in 3D space.
 * @param {*} props Additional properties passed to the component, which are applied to the mesh.
 * @returns A 3d logo object component.
 */
function Logo({ kind, ...props })
{   
    /**
     * State for the logo kind
     */
    const logoKind = kind || 'linkedin';
    const logoPath = logoKind === 'github' 
        ? '/models/socialMediaIcons/github.glb' 
        : logoKind === 'email' 
        ? '/models/socialMediaIcons/email.glb' 
        : '/models/socialMediaIcons/linkedin.glb';
    

    const logoModel = useGLTF(logoPath);
    const clonedLogo = clone(logoModel.scene.children[0]);
    clonedLogo.position.set(0, 1, 0);

    console.log(logoModel.scene.children[0].children)

    // Order: github, email, linkedin
    logoKind === 'github' ? clonedLogo.scale.set(10, 10, 10) : clonedLogo.scale.set(0.3, 0.3, 0.3);
    
    clonedLogo.rotation.set(Math.PI/2, 0, Math.PI/2);

    return (
        <primitive object={clonedLogo} {...props}/>
    )
}

export default Logo;