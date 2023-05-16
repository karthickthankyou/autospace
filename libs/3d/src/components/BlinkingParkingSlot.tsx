import React, { useState, useEffect } from 'react'
import { ParkingSlot, ParkingSlotProps } from './ParkingSlot'
import { radians } from './Camera'
import { Html } from '@react-three/drei'
import { IconSearch } from '@tabler/icons-react'
import { LensIcon } from './Lens'
import { yellow } from './Car'

interface BlinkingParkingSlotProps extends ParkingSlotProps {
  blinkDuration?: number
}

export const BlinkingParkingSlot = ({
  borderColor = yellow,
  blinkDuration = 1000,
  ...props
}: BlinkingParkingSlotProps) => {
  const [isBlinking, setIsBlinking] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking((prevState) => !prevState)
    }, blinkDuration)

    return () => {
      clearInterval(interval)
    }
  }, [blinkDuration])

  if (isBlinking) return null

  return (
    <mesh rotation={[radians(0), radians(90), 0]} position={[0, 2, 0]}>
      <ParkingSlot
        {...props}
        borderColor={borderColor}
        enableoOccupied={false}
      />
    </mesh>
  )
}
