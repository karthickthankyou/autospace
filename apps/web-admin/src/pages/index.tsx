import { Container } from '@autospace-org/ui/src/components/atoms/Container'
import { AuthLayoutSimple } from '@autospace-org/ui/src/components/molecules/AuthLayoutSimple'
import { Admin } from '@autospace-org/ui/src/components/templates/Admin'
import { IsLoggedIn } from '@autospace-org/ui/src/components/templates/IsLoggedIn'
import { LoginForm } from '@autospace-org/ui/src/components/templates/LoginForm'

export default function Home() {
  return (
    <main>
      <Container>
        <IsLoggedIn
          notLoggedIn={
            <AuthLayoutSimple title="Login">
              <LoginForm />
            </AuthLayoutSimple>
          }
        >
          <Admin />
        </IsLoggedIn>
      </Container>
    </main>
  )
}
