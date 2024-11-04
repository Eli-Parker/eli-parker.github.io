import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Edges, MeshPortalMaterial, Environment } from '@react-three/drei'

/**
 * MagicBox component renders a 3D box with various geometries on its sides.
 * Code modified from the react three fiber examples https://codesandbox.io/s/drc6qg 
 * @param {Object} param0 - The props object.
 * @param {Array} param0.position - The position of the box in the 3D space, represented as an array of three numbers [x, y, z].
 * @param {Array} param0.rotation - The rotation of the box in the 3D space, represented as an array of three numbers [x, y, z].
 * @returns {JSX.Element} The MagicBox component.
 */
export default function MagicBox({ position, rotation }) {

    // Get the box model
    const magBox = useRef()

    // Rotate the magic box
    useFrame(({ clock }) => {
        const a = clock.getElapsedTime();
        magBox.current.rotation.y = a;
      });

    return (
    <mesh ref={magBox} position={ position } rotation={ rotation } scale={0.3}>
        <boxGeometry args={[2, 2, 2]} />
        <Edges />
        <Side rotation={[0, Math.PI, 0]} bg="lightblue" index={1}>
          <torusKnotGeometry args={[0.55, 0.2, 128, 32]} />
        </Side>
        <Side rotation={[0, -Math.PI / 2, 0]} bg="indianred" index={4}>
          <icosahedronGeometry />
        </Side>

        {/* Undefined sides for transparent effect */}

        {/* <Side rotation={[0, 0, 0]} bg="orange" index={0}>
          <torusGeometry args={[0.65, 0.3, 64]} />
        </Side> */}
        {/* <Side rotation={[0, Math.PI / 2, Math.PI / 2]} bg="lightgreen" index={2}>
          <boxGeometry args={[1.15, 1.15, 1.15]} />
        </Side> */}
        {/* <Side rotation={[0, Math.PI / 2, -Math.PI / 2]} bg="aquamarine" index={3}>
          <octahedronGeometry />
        </Side> */}
        {/* <Side rotation={[0, Math.PI / 2, 0]} bg="hotpink" index={5}>
          <dodecahedronGeometry />
        </Side> */}
    </mesh>
    );
}

/**
 *  puts a portal on the given side of the box with an object in it.
 * 
 * @returns a portal mesh to render the sides of the box
 */
function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', children, index }) {
    const mesh = useRef()
    const { nodes } = useGLTF('/aobox-transformed.glb')
    useFrame((state, delta) => {
      mesh.current.rotation.x = mesh.current.rotation.y += delta
    })
    return (
      <MeshPortalMaterial attach={`material-${index}`}>
        {/** Everything in here is inside the portal and isolated from the canvas */}
        <ambientLight intensity={0.5} />
        <Environment preset="city" />
        {/** A box with baked AO */}
        <mesh castShadow receiveShadow rotation={rotation} geometry={nodes.Cube.geometry}>
          <meshStandardMaterial aoMapIntensity={1} aoMap={nodes.Cube.material.aoMap} color={bg} />
          <spotLight castShadow color={bg} intensity={2} position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} />
        </mesh>
        {/** The shape */}
        <mesh castShadow receiveShadow ref={mesh}>
          {children}
          <meshLambertMaterial color={bg} />
        </mesh>
      </MeshPortalMaterial>
    )
  }