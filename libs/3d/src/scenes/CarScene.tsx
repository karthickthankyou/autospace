import { Canvas, useFrame } from '@react-three/fiber'
import { Plane, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import React from 'react'
import { Car } from '../components/Car'

import * as THREE from 'three'
import { Spawner } from '../components/SpawnerWithPrewarm'
import { BuildingSet } from '../components/MovingPlane3'
import { useRef, useState } from 'react'
import { randInt } from 'three/src/math/MathUtils'

const radians = (degrees: number) => degrees * (Math.PI / 180)

const worldDuration = 24
const worldStart = -500
const worldEnd = 300

export const RotatingCamera = ({
  speed = 0.001,
  minFov = 30,
  maxFov = 60,
  radius = 40,
}) => {
  const [angle, setAngle] = useState(() => randInt(0, radius))
  const [fov, setFov] = useState(() => randInt(minFov, maxFov))

  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  useFrame((state, delta) => {
    if (cameraRef.current) {
      setAngle((prevAngle) => (prevAngle + speed) % (2 * Math.PI))

      cameraRef.current.position.x = radius * Math.sin(angle)
      cameraRef.current.position.z = radius * Math.cos(angle)
      cameraRef.current.position.y = 200
      cameraRef.current.lookAt(1, 0, 1)

      const amplitude = (maxFov - minFov) / 2
      const oscillationSpeed = 0.05
      setFov(
        minFov +
          amplitude +
          Math.sin(state.clock.elapsedTime * oscillationSpeed) * amplitude,
      )
    }
  })

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={[0, 200, 0]}
      />
    </>
  )
}
export const StraightCamera = ({
  fov = 80,
  position = [1, 300, -1] as [number, number, number],
}) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>()

  return (
    <>
      <PerspectiveCamera
        makeDefault
        fov={fov}
        near={0.1}
        far={1000}
        position={position}
      />
    </>
  )
}

export const CarScene = ({
  children,
  camera,
  className = 'h-[calc(100vh-2rem)]',
  orbitControls = true,
}: {
  camera?: React.ReactNode
  children?: React.ReactNode
  className?: string
  orbitControls?: boolean
}) => {
  return (
    <Canvas
      style={{
        background:
          'linear-gradient(to top right, hsl(0, 0%, 0%), hsl(52, 0%, 15%))',
      }}
      className={className}
      //   camera={{
      //     fov: 60,
      //     near: 0.1,
      //     far: 1000,
      //     position: [0, 200, 0],
      //     rotation: [radians(45), radians(0), radians(0)],
      //   }}
    >
      {camera || (
        <PerspectiveCamera
          makeDefault
          fov={60}
          near={0.1}
          far={1000}
          position={[0, 200, 0]}
          rotation={[radians(60), 0, 0]}
        />
      )}
      {children}
      {orbitControls ? (
        <OrbitControls
          minPolarAngle={radians(0)}
          maxPolarAngle={radians(45)}
          minAzimuthAngle={radians(30)}
          maxAzimuthAngle={radians(150)}
          minDistance={45}
          maxDistance={200}
        />
      ) : null}

      {/* Road */}
      <Plane
        args={[1000, 22]}
        position={[-120, -0.02, -0.5]}
        rotation={[radians(-90), 0, 0]}
      >
        <meshBasicMaterial color="black" />
      </Plane>

      {/* Building set */}
      {/* FAr left */}
      <Spawner
        spawnInterval={3.6}
        startPosition={new THREE.Vector3(worldStart, 0.1, 192)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, 192)}
        duration={worldDuration}
        childrenFactory={() => <BuildingSet maxHeight={4} />}
      />
      <Spawner
        spawnInterval={3.6}
        startPosition={new THREE.Vector3(worldStart, 0.1, 72)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, 72)}
        duration={worldDuration}
        childrenFactory={() => <BuildingSet />}
      />
      <Spawner
        spawnInterval={3.6}
        startPosition={new THREE.Vector3(worldStart, 0.1, -73)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -73)}
        duration={worldDuration}
        childrenFactory={() => <BuildingSet />}
      />
      <Spawner
        spawnInterval={3.6}
        startPosition={new THREE.Vector3(worldStart, 0.1, -193)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -193)}
        duration={worldDuration}
        childrenFactory={() => <BuildingSet maxHeight={4} />}
      />

      <Spawner
        spawnInterval={8}
        startPosition={new THREE.Vector3(worldStart, 0.1, -10)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -10)}
        duration={worldDuration - 12}
        childrenFactory={() => <Car color="gray" searching forward={false} />}
      />
      <Spawner
        spawnInterval={4.3}
        startPosition={new THREE.Vector3(worldStart, 0.1, -6)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -6)}
        duration={worldDuration - 14}
        childrenFactory={() => <Car color="gray" forward={false} />}
      />
      <Spawner
        spawnInterval={7}
        startPosition={new THREE.Vector3(worldStart, 0.1, -2)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -2)}
        duration={worldDuration - 16}
        childrenFactory={() => <Car color="gray" forward={false} />}
      />
      <Spawner
        spawnInterval={9}
        endPosition={new THREE.Vector3(worldStart, 0.1, 2)}
        startPosition={new THREE.Vector3(worldEnd, 0.1, 2)}
        duration={worldDuration - 14}
        childrenFactory={() => <Car color="gray" />}
      />
      <Spawner
        spawnInterval={7}
        endPosition={new THREE.Vector3(worldStart, 0.1, 6)}
        startPosition={new THREE.Vector3(worldEnd, 0.1, 6)}
        duration={worldDuration - 10}
        childrenFactory={() => <Car color="gray" />}
      />

      <mesh position={[0, 0, 9]}>
        <Car
          position={new THREE.Vector3(0, 0, 0)}
          size={[2, 0.3, 4]}
          searching
        />
      </mesh>

      {/* Car searching for parking */}
      <Spawner
        spawnInterval={6}
        startPosition={new THREE.Vector3(worldStart, 0.1, 12)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, 12)}
        duration={worldDuration + 4}
        childrenFactory={() => (
          <Car color="gray" forward={false} searching trail={false} />
        )}
      />
      <Spawner
        spawnInterval={7.3}
        startPosition={new THREE.Vector3(worldStart, 0.1, -13)}
        endPosition={new THREE.Vector3(worldEnd, 0.1, -13)}
        duration={worldDuration - 4}
        childrenFactory={() => (
          <Car color="gray" forward={false} searching trail={false} />
        )}
      />
    </Canvas>
  )
}
