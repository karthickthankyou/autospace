import React, { useEffect, useState } from 'react'
import { MeshProps } from '@react-three/fiber'
import { randFloat, randInt } from 'three/src/math/MathUtils'
import { yellow } from './Car'

export interface ParkingSlotProps extends MeshProps {
  position: [number, number, number]
  size?: [number, number]
  borderColor?: string
  enableoOccupied?: boolean
}

interface BuildingProps extends ParkingSlotProps {
  floors?: number
}

export const Building = ({ position, size, floors = 3 }: BuildingProps) => {
  const floorHeight = 6 // You can adjust this value according to your needs

  const floorsArray = Array.from({ length: floors }, (_, index) => (
    <ParkingSlot
      key={index}
      position={[position[0], position[1] + index * floorHeight, position[2]]}
      size={size}
      borderColor="white"
      enableoOccupied={false}
    />
  ))

  return <>{floorsArray}</>
}

export const ParkingSlot: React.FC<ParkingSlotProps> = ({
  position,
  size = [3, 5],
  borderColor = yellow,
  enableoOccupied,
  ...props
}) => {
  const halfWidth = size[0] / 2
  const halfLength = size[1] / 2
  const borderThickness = 0.2

  const [occupied, setoccupied] = useState(false)

  useEffect(() => {
    if (enableoOccupied === undefined) {
      setoccupied(randInt(0, 1) === 1)
    }
  }, [])

  return (
    <>
      {/* Occupied */}
      {occupied ? (
        <mesh position={[position[0], position[1], position[2]]} {...props}>
          <boxGeometry
            args={[
              size[0] - randFloat(0.8, 1.6),
              0.1,
              size[1] - randFloat(0.8, 1.6),
            ]}
          />
          <meshBasicMaterial color={'gray'} />
        </mesh>
      ) : null}
      {/* Top border */}
      <mesh
        position={[
          position[0],
          position[1],
          position[2] + halfLength - borderThickness / 2,
        ]}
        {...props}
      >
        <boxGeometry args={[size[0], borderThickness, borderThickness]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Bottom border */}
      <mesh
        position={[
          position[0],
          position[1],
          position[2] - halfLength + borderThickness / 2,
        ]}
        {...props}
      >
        <boxGeometry args={[size[0], borderThickness, borderThickness]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Left border */}
      <mesh
        position={[
          position[0] - halfWidth + borderThickness / 2,
          position[1],
          position[2],
        ]}
        {...props}
      >
        <boxGeometry
          args={[
            borderThickness,
            borderThickness,
            size[1] - 2 * borderThickness,
          ]}
        />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* Right border */}
      <mesh
        position={[
          position[0] + halfWidth - borderThickness / 2,
          position[1],
          position[2],
        ]}
        {...props}
      >
        <boxGeometry
          args={[
            borderThickness,
            borderThickness,
            size[1] - 2 * borderThickness,
          ]}
        />
        <meshBasicMaterial color={borderColor} />
      </mesh>
    </>
  )
}
