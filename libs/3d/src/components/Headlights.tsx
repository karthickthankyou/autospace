import { GradientTexture, Plane } from '@react-three/drei'
import * as THREE from 'three'
import { Vector3 } from 'three'
import { radians } from './Camera'

interface HeadlightsProps {
  position?: THREE.Vector3
  topWidth?: number
  bottomWidth?: number
  height?: number
  color?: string
}

export const CarTrail: React.FC<HeadlightsProps> = ({
  position = new Vector3(0, 0.01, 0),
  topWidth = 5,
  bottomWidth = 1,
  height = 2,
  color = 'white',
}) => {
  return (
    <mesh position={position}>
      <Plane
        args={[0, 10]}
        rotation={[radians(-90), 0, radians(-90)]}
        position={position}
      >
        <meshBasicMaterial side={THREE.DoubleSide}>
          <GradientTexture stops={[0, 1]} colors={['white', 'black']} />
        </meshBasicMaterial>
      </Plane>
    </mesh>
  )
}
