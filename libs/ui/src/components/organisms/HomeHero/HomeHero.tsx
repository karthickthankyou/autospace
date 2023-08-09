import { useRouter } from 'next/router'
import { Container } from '../../atoms/Container'
import { HeroSearchForm } from '../HeroSearchForm'
export interface IHomeHeroProps {}

export const HomeHero = ({}: IHomeHeroProps) => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-1 grid-rows-1 h-[80vh]">
      <div className="min-w-full col-span-1 col-start-1 row-span-1 row-start-1">
        <img
          src={'https://placehold.co/400'}
          alt=""
          className="object-cover h-full min-w-full"
        />
      </div>
      <div className="col-span-1 col-start-1 row-span-1 row-start-1">
        <Container className="flex items-center h-full">
          <div className="p-8 bg-white/60 backdrop-blur-sm">
            <div>
              <h1 className="text-4xl font-bold">Find your parking space</h1>
            </div>
            <div className="mt-6">
              <HeroSearchForm router={router} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
