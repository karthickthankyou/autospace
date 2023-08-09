import { useEffect, useState } from 'react'
import { radians } from './Camera'
import { yellow } from './Car'
import { ParkingSlot, ParkingSlotProps } from './ParkingSlot'

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
