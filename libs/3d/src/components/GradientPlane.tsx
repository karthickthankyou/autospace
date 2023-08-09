import { useMemo } from 'react'
import { CanvasTexture, Euler, Vector3 } from 'three'
import { radians } from './Camera'

export const GradientPlane = ({
  position,
  rotation = new Euler(radians(-90), 0, 0),
  size,
}: {
  position: Vector3
  size: [number, number]
  rotation?: Euler
}) => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Failed to get canvas 2D context')
    }

    const gradient = ctx.createLinearGradient(0, 0, 256, 0)
    gradient.addColorStop(0, 'gray')
    gradient.addColorStop(1, 'black')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 256, 256)
    return new CanvasTexture(canvas)
  }, [])

  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
