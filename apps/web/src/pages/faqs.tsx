import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { Accordion } from '@autospace-org/ui/src/components/molecules/Accordion'

const AboutPage = () => {
  return (
    <main>
      <Container>
        <Accordion title="Where are all the FAQs?">
          Oh, the FAQs? They&apos;re crafted in an ultra-sophisticated code
          language that&apos;s, um, totally ahead of its time. Yep, so advanced
          that we&apos;re, uh, patiently awaiting a universal translator
          update... any day now! Trust me! 😉👽 /s
        </Accordion>
        <Accordion title="Is it true that this site is powered by a hamster running on a wheel?">
          Not quite! In reality, it&apos;s powered by the neural firings in the
          developer&apos;s brain. /s
        </Accordion>
      </Container>
    </main>
  )
}

export default AboutPage
