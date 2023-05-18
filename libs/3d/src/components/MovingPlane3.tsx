import { useState, useEffect } from 'react'
import * as THREE from 'three'
import { radians } from './Camera'
import { GradientCube } from './GradientCube'
import { randInt } from 'three/src/math/MathUtils'
import React from 'react'
import { randExp } from './MovingPlane2'
import { Building, ParkingSlot, floorHeight } from './ParkingSlot'

const random = (min: number, max: number) => Math.random() * (max - min) + min

const angles = [90, 180, 270, 0]

export const BuildingSet = React.memo(
  ({
    minHeight = 2,
    maxHeight = 20,
  }: {
    minHeight?: number
    maxHeight?: number
  }) => {
    const [buildingSetIndex, setBuildingSetIndex] = useState<number>(0)
    const [floors, setFloors] = useState<number[]>([])

    useEffect(() => {
      setBuildingSetIndex(randInt(0, buildingSets.length - 1))

      // Set random floors for each building in the selected building set
      setFloors(
        buildingSets[buildingSetIndex].map(() => {
          const randHeight = randExp(minHeight, maxHeight, 7)
          return Math.floor(randHeight)
        }),
      )
    }, [])

    return (
      <group>
        <mesh
          rotation={[
            radians(0),
            radians(angles[randInt(0, angles.length - 1)]),
            0,
          ]}
        >
          {buildingSets[buildingSetIndex].map(
            ({ length, position, width }, i) => (
              <>
                <Building
                  position={
                    position.map((pos) => pos * 2) as [number, number, number]
                  }
                  size={[width * 2, length * 2]}
                  floors={floors[i]}
                />
                {/* Add a translucent white plane that is the same size as the parking lot */}

                <mesh
                  position={[
                    position[0] * 2,
                    floorHeight * (floors[i] - 1), // Adjust the y-position to the top of the building
                    position[2] * 2,
                  ]}
                  rotation={[radians(-90), 0, 0]} // Rotate the plane to align with the ground
                >
                  <planeGeometry args={[width * 2, length * 2]} />
                  <meshBasicMaterial
                    color={'black'}
                    transparent
                    opacity={0.5}
                  />
                </mesh>
              </>
            ),
          )}
        </mesh>
      </group>
    )
  },
)

export type BuildingSet = {
  position: [number, number, number]
  width: number
  length: number
}

const sideSm = 18
const sideMd = 38
const sideLg = 58

const buildingSet1 = [
  { position: [20, 0, 20], width: sideSm, length: sideSm },
  { position: [0, 0, 20], width: sideSm, length: sideSm },
  { position: [-20, 0, 20], width: sideSm, length: sideSm },
  { position: [20, 0, 0], width: sideSm, length: sideSm },
  { position: [0, 0, 0], width: sideSm, length: sideSm },
  { position: [-20, 0, 0], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
]
const buildingSet2 = [
  { position: [10, 0, 20], width: sideMd, length: sideSm },
  { position: [-20, 0, 20], width: sideSm, length: sideSm },
  { position: [20, 0, 0], width: sideSm, length: sideSm },
  { position: [0, 0, 0], width: sideSm, length: sideSm },
  { position: [-20, 0, 0], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
]

const buildingSet3 = [
  { position: [0, 0, 20], width: sideLg, length: sideSm },

  { position: [20, 0, 0], width: sideSm, length: sideSm },
  { position: [0, 0, 0], width: sideSm, length: sideSm },
  { position: [-20, 0, 0], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
]
const buildingSet4 = [
  { position: [0, 0, 20], width: sideLg, length: sideSm },

  { position: [20, 0, 0], width: sideSm, length: sideSm },

  { position: [-20, 0, 0], width: sideSm, length: sideSm },

  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
]
const buildingSet5 = [
  { position: [-10, 0, 0], width: sideMd, length: sideMd },
  { position: [-20, 0, 20], width: sideSm, length: sideSm },
  { position: [20, 0, 0], width: sideSm, length: sideSm },
  { position: [0, 0, 0], width: sideSm, length: sideSm },
  { position: [-20, 0, 0], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
]

const buildingSet2x2_1x1 = [
  { position: [10, 0, 10], width: sideMd, length: sideMd },
  { position: [-20, 0, 20], width: sideSm, length: sideSm },
  { position: [-20, 0, 0], width: sideSm, length: sideSm },
  { position: [-20, 0, -20], width: sideSm, length: sideSm },
  { position: [0, 0, -20], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
]

const buildingSetLShape = [
  { position: [20, 0, 20], width: sideSm, length: sideSm },
  { position: [0, 0, 20], width: sideSm, length: sideSm },
  { position: [-20, 0, 20], width: sideSm, length: sideSm },
  { position: [20, 0, 0], width: sideSm, length: sideSm },
  { position: [0, 0, 0], width: sideSm, length: sideSm },
  { position: [20, 0, -20], width: sideSm, length: sideSm },
]
const buildingSetWhole = [
  { position: [0, 0, 0], width: sideLg, length: sideLg },
]
const buildingSetWhole2 = [
  { position: [0, 0, -10], width: sideLg, length: sideMd },
]
const buildingSetWhole3 = [
  { position: [0, 0, -20], width: sideLg, length: sideSm },
]
const buildingSetEmpty: BuildingSet[] = []

export const buildingSets = [
  buildingSet1,
  buildingSet2x2_1x1,
  buildingSet4,
  buildingSetWhole,
  buildingSetWhole2,
  buildingSetWhole3,
]
