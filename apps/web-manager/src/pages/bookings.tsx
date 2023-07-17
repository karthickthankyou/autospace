import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { AlertSection } from '@autospace-org/ui/src/components/organisms/AlertSection'

import { ListBookings } from '@autospace-org/ui/src/components/templates/ListBookings'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function BookingsPage() {
  const { query } = useRouter()
  const garageId = Number(query.garageId)

  if (isNaN(garageId)) {
    return <AlertSection>(`Invalid garageId: ${query.garageId}`)</AlertSection>
  }

  return (
    <>
      <Head>
        <title>Manage Bookings | Autospace | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-50">
        <Container>
          <ListBookings garageId={garageId} />
        </Container>
      </main>
    </>
  )
}
