import { IconMoodSad } from '@tabler/icons-react'

import Head from 'next/head'
import Link from 'next/link'

export default function BookingFailed() {
  return (
    <>
      <Head>
        <title>Booking Failed - Oops!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-lg ">
          <h1 className="flex items-center gap-2 my-4 text-4xl font-bold">
            <IconMoodSad className="w-10 h-10" />
            Oh no, your booking failed!
          </h1>

          <p className="my-4 ">
            This is more disappointing than a popcorn kernel that didn&apos;t
            pop. But don&apos;t worry, our team of highly trained monkeys has
            been dispatched to solve the issue. 🐒
          </p>

          <p className="my-4 ">
            In the meantime, why not try booking again? Or take a deep breath,
            make a cup of tea ☕, and remember, life is full of little hiccups.
          </p>

          <Link
            className="mt-4 font-bold text-blue-500 underline underline-offset-4"
            href="/search"
          >
            Try again
          </Link>
          <div className="h-0.5 bg-gray-50 w-full my-24" />
          <p className="my-4 ">
            If the problem persists, please contact our support team. We&apos;re
            here to help!
          </p>
        </div>
      </main>
    </>
  )
}
