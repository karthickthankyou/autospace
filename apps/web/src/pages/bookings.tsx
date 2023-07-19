import Head from 'next/head'
import { CustomerBookings } from '@autospace-org/ui/src/components/templates/CustomerBookings'
import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { useAppSelector } from '@autospace-org/store'
import { selectUid } from '@autospace-org/store/user'

import { AlertSection } from '@autospace-org/ui/src/components/organisms/AlertSection'
import Link from 'next/link'

export default function Bookings() {
  const uid = useAppSelector(selectUid)

  return (
    <>
      <Head>
        <title>Bookings | Autospace | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-25">
        <Container className="min-h-[90vh]">
          {uid ? (
            <CustomerBookings />
          ) : (
            <AlertSection title="You are not logged in.">
              <Link href="/login">Login</Link>
            </AlertSection>
          )}
        </Container>
      </main>
    </>
  )
}
