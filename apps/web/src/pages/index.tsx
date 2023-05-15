import { CarScene } from '@autospace-org/3d/src/scenes/CarScene'
import Link from 'next/link'
import { IconSearch } from '@tabler/icons-react'

export default function Home() {
  return (
    <main>
      <div className="relative h-[calc(100vh-4rem)]">
        <div className="absolute top-0 bottom-0 left-0 right-0 p-2">
          <CarScene className="h-full shadow-lg shadow-black/40" />
        </div>
        {/* <div className="container relative mx-auto"> */}

        <div className="flex flex-col items-start space-y-2 font-black text-8xl">
          <div className="z-10 inline-block px-3 bg-yellow">Need</div>{' '}
          <div className="z-10 inline-block w-full max-w-md px-3 bg-yellow ">
            parking?
          </div>
          <Link
            href="/search"
            className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4 bg-primary"
          >
            <IconSearch /> Search now
          </Link>
        </div>
      </div>
    </main>
  )
}
