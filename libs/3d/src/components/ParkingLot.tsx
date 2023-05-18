import React from 'react'
import { ParkingSlot } from './ParkingSlot'
import { randInt } from 'three/src/math/MathUtils'
import { radians } from './Camera'
import { Vector3 } from 'three'

interface ParkingLotProps {
  parentPosition?: [number, number, number]
  rows: number
  columns: number
  slotSize?: [number, number]
  gap?: number
  floors?: number
}

const slotPresence = [
  1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0,
  1, 1, 0, 1, 1, 0,
]

const angles = [90, 180, 270, 0]

const floorHeight = 6
export const ParkingLot = ({
  rows,
  columns,
  floors = 1,
  slotSize = [3, 5],
  parentPosition = [0, 0, 0],
}: ParkingLotProps) => {
  const [slotWidth, slotLength] = slotSize
  const rowWidth = slotWidth * columns + (columns - 1)

  const parkingRows: JSX.Element[] = []
  for (let floor = 0; floor < floors; floor++) {
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        const x = col * slotWidth + slotWidth / 2
        const z = row * slotLength + slotLength / 2
        const y = floor * floorHeight

        // Position the parking slots based on row parity
        if (slotPresence[row] === 1) {
          parkingRows.push(
            <ParkingSlot
              key={`${floor}-${row}-${col}`}
              position={[x, y, z]}
              enableoOccupied
            />,
          )
        }
      }
    }
  }

  return (
    <group>
      <mesh position={parentPosition}>{parkingRows}</mesh>
    </group>
  )
}
