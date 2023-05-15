import React, { useState, useEffect } from 'react'
import { Box, GradientTexture, Plane } from '@react-three/drei'
import { radians } from './Camera'
import { CarTrail } from './Headlights'
import { Color } from '@react-three/fiber'
import { Euler, Vector3 } from 'three'
import { randFloat } from 'three/src/math/MathUtils'
import { GradientPlane } from './GradientPlane'
import { BlinkingParkingSlot } from './BlinkingParkingSlot'
export const yellow = 'hsl(52, 100%, 50%)'

interface CarProps {
  color?: Color
  position?: Vector3
  size?: [number, number, number]
  forward?: boolean
  searching?: boolean
  trail?: boolean
}

export const Car: React.FC<CarProps> = ({
  color = 'hsl(52, 100%, 50%)',
  position = new Vector3(0, 0, 0),
  size,
  forward = true,
  trail = true,
  searching = false,
}) => {
  const [vehicleSize, setVehicleSize] = useState<[number, number, number]>([
    0, 0, 0,
  ])

  useEffect(() => {
    const newSize = size || [
      randFloat(1.9, 2.3),
      //   randFloat(1, 2),
      0.1,
      randFloat(4, 5.6),
    ]
    setVehicleSize(newSize)
  }, [size])

  return (
    <>
      <Box
        position={position}
        rotation={[radians(0), radians(90), 0]}
        args={vehicleSize}
      >
        <meshBasicMaterial color={color} />
      </Box>
      {searching ? <BlinkingParkingSlot position={[0, 0, 0]} /> : null}
      {trail ? (
        forward ? (
          <GradientPlane
            position={new Vector3(vehicleSize[2] / 1.3, -0.02, position.z)}
            size={[3, 2]}
          />
        ) : (
          <GradientPlane
            rotation={new Euler(radians(-90), radians(0), radians(180))}
            position={new Vector3(-(vehicleSize[2] / 1.3), 0.02, position.z)}
            size={[3, vehicleSize[0]]}
          />
        )
      ) : null}
    </>
  )
}
