import { ValetHome } from '@autospace-org/ui/src/components/templates/ValetHome'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`bg-gray-25 ${inter.className}`}>
      <ValetHome />
    </main>
  )
}
