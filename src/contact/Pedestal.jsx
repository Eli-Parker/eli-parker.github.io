import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils.js';

/**
 * Returns a pedestal object in 3D space.
 * @param {*} props Additional properties passed to the component, which are applied to the mesh.
 * @returns A 3d pedestal object component.
 */
function Pedestal({ ...props })
{   
    const pedestalModel = useGLTF(`/models/pedestal/pedestal.glb`);
    const clonedPedestal = clone(pedestalModel.scene);

    return (
        <primitive object={clonedPedestal} {...props}/>
    )
}

export default Pedestal;