import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'

import Head from 'next/head'

export default function Login() {
  return (
    <>
      <Head>
        <title>Register | Autospace | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthLayoutSimple title="Register">
          <div>Contact autospace management to become admin.</div>
        </AuthLayoutSimple>
      </main>
    </>
  )
}
