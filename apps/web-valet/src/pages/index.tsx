import { ValetHome } from '@autospace-org/ui/src/components/templates/ValetHome'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={` ${inter.className}`}>
      <ValetHome />
    </main>
  )
}
