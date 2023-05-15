import { ReactNode } from 'react'
import { BrandIcon } from '../../atoms/BrandIcon'
import { CarScene, RotatingCamera } from '@autospace-org/3d/src/scenes/CarScene'
import Link from 'next/link'
import { IconArrowBack } from '@tabler/icons-react'
import { Container } from '../../atoms/Container'

export interface IAuthLayoutProps {
  children: ReactNode
  title: string
}

export const AuthLayout = ({ title, children }: IAuthLayoutProps) => {
  return (
    <div className="grid min-h-screen gap-4 overflow-hidden md:p-4 md:grid-cols-2 lg:grid-cols-4">
      <div className="hidden shadow-lg shadow-black/50 lg:block">
        <CarScene
          className="h-full"
          camera={
            <RotatingCamera
              maxFov={50}
              minFov={20}
              radius={80}
              speed={-0.002}
            />
          }
        />
      </div>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-0 right-0 -z-10">
          <CarScene
            className="h-full"
            orbitControls={false}
            camera={<RotatingCamera />}
          />
        </div>
        <div className="flex flex-col justify-center h-full p-4 text-white shadow-lg backdrop-blur-sm shadow-black/50">
          <div className="w-full max-w-lg mx-auto ">
            <h1 className="flex items-end gap-2 mb-2 text-2xl">
              <BrandIcon /> <div>{title}</div>
            </h1>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <Link href="/" className="flex items-center gap-2">
                <IconArrowBack className="w-4 h-4" /> Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden shadow-lg lg:block shadow-black/50">
        <CarScene
          className="h-full"
          camera={
            <RotatingCamera
              maxFov={70}
              minFov={20}
              radius={120}
              speed={-0.003}
            />
          }
        />
      </div>
      <div className="hidden shadow-lg md:block shadow-black/50">
        <CarScene
          className="h-full"
          camera={
            <RotatingCamera
              maxFov={70}
              minFov={20}
              radius={120}
              speed={-0.003}
            />
          }
        />
      </div>
    </div>
  )
}
