import {
  IconChevronLeft,
  IconChevronRight,
  IconPhotoCancel,
} from '@tabler/icons-react'
import { AnimatePresence, motion } from 'framer-motion'

export interface IAutoImageChangerProps {
  images: string[]
  durationPerImage?: number
}

import { useEffect, useState } from 'react'

const variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
}

// Auto changing image component
export const AutoImageChanger = ({
  images,
  durationPerImage = 5,
}: IAutoImageChangerProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((oldIndex) => (oldIndex + 1) % images.length)
    }, durationPerImage * 1000)

    return () => clearInterval(intervalId)
  }, [images, durationPerImage])
  if (images.length === 0)
    return (
      <div className="flex items-center justify-center w-full h-48 gap-2 text-sm bg-white border select-none border-gray-50 text-gray">
        <IconPhotoCancel /> No images.
      </div>
    )

  return (
    <div className="relative w-full h-48 overflow-hidden">
      <AnimatePresence>
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="Garage"
          className="absolute object-cover w-full h-full"
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center p-1 space-x-2">
        {images.map((_, index) => (
          <div
            className={` h-2 duration-1000 transition-transform duration-300 rounded-full ${
              currentImageIndex === index ? 'bg-white  w-4' : 'bg-gray-300  w-2'
            }`}
            key={index}
          />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 left-2"
            onClick={() =>
              setCurrentImageIndex((prevIndex) =>
                prevIndex === 0 ? images.length - 1 : prevIndex - 1,
              )
            }
          >
            <IconChevronLeft className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
          </button>
          <button
            type="button"
            className="absolute transform -translate-y-1/2 top-1/2 right-2"
            onClick={() =>
              setCurrentImageIndex(
                (prevIndex) => (prevIndex + 1) % images.length,
              )
            }
          >
            <IconChevronRight className="w-6 h-6 text-black rounded-full bg-white/40 hover:bg-white" />
          </button>
        </>
      )}
    </div>
  )
}
