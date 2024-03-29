import { MyTrips } from '@autospace-org/ui/src/components/templates/MyTrips'
import Head from 'next/head'

import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { IsLoggedIn } from '@autospace-org/ui/src/components/templates/IsLoggedIn'

export default function Login() {
  return (
    <>
      <Head>
        <title>My Trips | Autospace | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-25">
        <Container>
          <IsLoggedIn>
            <MyTrips />
          </IsLoggedIn>
        </Container>
      </main>
    </>
  )
}
