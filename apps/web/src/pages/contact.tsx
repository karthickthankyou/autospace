import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { AlertSection } from '@autospace-org/ui/src/components/organisms/AlertSection'
import Link from 'next/link'

const AboutPage = () => {
  return (
    <main>
      <Container>
        <AlertSection>
          <div>Hey 👋. Thanks for checking out my portfolio project.</div>
          <div>
            You can contact me through{' '}
            <Link
              target="_blank"
              className="font-semibold underline underline-offset-4"
              href="https://www.linkedin.com/in/iamkarthickr/"
            >
              LinkedIn.
            </Link>
          </div>
        </AlertSection>
      </Container>
    </main>
  )
}

export default AboutPage
