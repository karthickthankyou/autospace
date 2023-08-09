import { useTexture } from '@react-three/drei'
import { BackSide, Vector3 } from 'three'
import { radians } from './Camera'

export const ImagePlane = ({
  src,
  position = new Vector3(0, 0, 0),
}: {
  src: string
  position?: THREE.Vector3
}) => {
  const texture = useTexture(src)
  const backPosition = position.clone().add(new Vector3(0, 0, 0.001))

  return (
    <>
      <mesh position={position} rotation={[0, radians(0), 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial map={texture} />
      </mesh>
      <mesh position={backPosition} rotation={[0, radians(0), 0]}>
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial color="black" side={BackSide} />
      </mesh>
    </>
  )
}
