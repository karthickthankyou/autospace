// ... other imports
import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Mover, SpawnedElement, useTabVisible } from './Spawner'

// ... other components

interface SpawnerProps {
  spawnInterval: number
  startPosition: THREE.Vector3
  endPosition: THREE.Vector3
  initialRotation?: THREE.Vector3
  finalRotation?: THREE.Vector3
  duration: number
  prewarmTime?: number
  childrenFactory: (id: number) => JSX.Element
}
export const Spawner: React.FC<SpawnerProps> = ({
  spawnInterval,
  startPosition,
  endPosition,
  initialRotation = new THREE.Vector3(0, 0, 0),
  finalRotation = new THREE.Vector3(0, 0, 0),
  duration,
  prewarmTime = 6,
  childrenFactory,
}) => {
  // State to hold spawned elements
  const [elements, setElements] = useState<Array<SpawnedElement>>([])
  const isTabVisible = useTabVisible()

  // Store last spawn time.
  const lastSpawnTime = useRef<number>(Date.now())

  // Calculate the number of prewarm elements based on prewarmTime
  const prewarmElementsCount = useMemo(
    () => Math.floor(prewarmTime / spawnInterval),
    [prewarmTime, spawnInterval],
  )

  useEffect(() => {
    // Initialize the elements with prewarm state
    const prewarmElements: Array<SpawnedElement> = []
    for (let i = 0; i < prewarmElementsCount; i++) {
      const id = Date.now() - i * spawnInterval * 1000
      const progress = (i * spawnInterval) / duration
      prewarmElements.unshift({ id, progress })
    }
    setElements(prewarmElements)
  }, [prewarmElementsCount, spawnInterval, duration])

  useFrame((_, delta) => {
    if (!isTabVisible) {
      return
    }
    if (Date.now() - lastSpawnTime.current >= spawnInterval * 1000) {
      // Check if it's time to spawn a new element
      const id = Date.now()

      lastSpawnTime.current = id
      setElements((prevElements) => [...prevElements, { id, progress: 0 }])
    }

    // Update the progress of each element and remove elements that have completed their movement
    setElements((prevElements) =>
      prevElements
        .map((elem) => {
          const progress = elem.progress + delta / duration
          if (progress >= 1) {
            return null
          }
          return { ...elem, progress }
        })
        .filter((elem): elem is SpawnedElement => elem !== null),
    )
  })

  return (
    <>
      {elements.map((elem) => (
        <Mover
          key={elem.id}
          startPosition={startPosition}
          endPosition={endPosition}
          initialRotation={initialRotation}
          finalRotation={finalRotation}
          progress={elem.progress}
        >
          {childrenFactory(elem.id)}
        </Mover>
      ))}
    </>
  )
}
