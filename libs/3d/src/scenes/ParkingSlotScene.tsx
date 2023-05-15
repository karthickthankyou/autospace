import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera } from '@react-three/drei'
import React from 'react'

import { ParkingSlot } from '../components/ParkingSlot'
import { Car } from '../components/Car'

const radians = (degrees: number) => degrees * (Math.PI / 180)

export const ParkingSlotScene = ({
  children,
  camera,
  className = 'h-[calc(100vh-2rem)]',
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

      <Car color="white" size={[2, 0.01, 4]} searching trail={false} />
    </Canvas>
  )
}
