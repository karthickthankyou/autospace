import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import Link from 'next/link'

export default function SettingsPage() {
  return (
    <main>
      <Container>
        <div className="text-6xl font-black tracking-tighter">
          What settings?
        </div>
        <div className="flex flex-col max-w-lg gap-4 mt-8 text-gray">
          <p>Who needs settings when things are already set to perfection?</p>
          <p>
            Here at Autospace, we focus on the big stuff so you don&apos;t sweat
            the small stuff. You&apos;re here to manage garages, and we&apos;ve
            optimized that to perfection.
          </p>
          <p>
            Plus, our developer (psst...{' '}
            <Link
              target="_blank"
              className="underline underline-offset-4"
              href="https://www.linkedin.com/in/iamkarthickr/"
            >
              me
            </Link>
            ) has been working tirelessly to ensure that your Autospace
            experience is like cruising in a self-driving car - smooth,
            effortless, and kind of magical. So, he took a
            <span className="font-bold">well-deserved break</span> when it came
            to the settings page. Can you blame him?
          </p>
        </div>
      </Container>
    </main>
  )
}
