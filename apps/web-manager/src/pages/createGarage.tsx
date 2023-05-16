import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { CreateGarage } from '@autospace-org/ui/src/components/templates/CreateGarage'
import Head from 'next/head'

export default function CreateGaragePage() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Container>
          <CreateGarage />
        </Container>
      </main>
    </>
  )
}