import Head from 'next/head'
import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'
import { LoginForm } from '@autospace-org/ui/src/components/templates/LoginForm'

export default function Login() {
  return (
    <>
      <Head>
        <title>Autospace | Karthick Ragavendran</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthLayoutSimple title="Login">
          <LoginForm />
        </AuthLayoutSimple>
      </main>
    </>
  )
}
