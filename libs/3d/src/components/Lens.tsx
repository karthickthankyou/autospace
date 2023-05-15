import React from 'react'
import { CircleGeometry, MeshBasicMaterial, BoxGeometry } from 'three'

export const LensIcon: React.FC = () => {
  const circleGeometry = new CircleGeometry(1, 32)
  const circleMaterial = new MeshBasicMaterial({ color: 'white' })

  const boxGeometry = new BoxGeometry(0.3, 1, 0.1)
  const boxMaterial = new MeshBasicMaterial({ color: 'white' })

  return (
    <group>
      <mesh geometry={circleGeometry} material={circleMaterial} />
      <mesh
        geometry={boxGeometry}
        material={boxMaterial}
        position={[0, 0.5, 0.05]}
      />
    </group>
  )
}
