import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import { Vector3 } from 'three'

const random = (min: number, max: number) => Math.random() * (max - min) + min

export const randExp = (min = 0, max = 10, exponent = 4): number => {
  const randomValue = Math.random() // A random value between 0 and 1
  const expValue = Math.pow(randomValue, exponent) // Apply the exponential curve
  const range = max - min

  return min + range * expValue // Scale the result to the desired range
}

const Building: React.FC<{ position: Vector3 }> = ({ position }) => {
  return (
    <mesh position={position}>
      <boxGeometry args={[5, random(1, 4), 5]} />
      <meshBasicMaterial />
    </mesh>
  )
}

interface MovingPlaneProps {
  startPosition: Vector3
  endPosition: Vector3
  duration: number
  onReachedEnd: () => void
}

export const MovingPlane: React.FC<MovingPlaneProps> = ({
  startPosition,
  endPosition,
  duration,
  onReachedEnd,
}) => {
  const planeRef = useRef<THREE.Group>(null)
  const startTime = useRef(performance.now())

  useFrame(({ clock }) => {
    if (planeRef.current) {
      const t = (clock.getElapsedTime() * 1000 - startTime.current) / duration
      if (t >= 1) {
        onReachedEnd()
      } else {
        planeRef.current.position.lerpVectors(startPosition, endPosition, t)
      }
    }
  })

  const buildings = useMemo(() => {
    const numBuildings = 5
    const buildingPositions: Vector3[] = []

    for (let i = 0; i < numBuildings; i++) {
      const x = random(-20, 20)
      const z = random(-20, 20)
      buildingPositions.push(new Vector3(x, 0, z))
    }

    return buildingPositions
  }, [])

  return (
    <group ref={planeRef} position={startPosition}>
      {buildings.map((position, index) => (
        <Building key={index} position={position} />
      ))}
    </group>
  )
}
